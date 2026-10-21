import { CLASSES_DATA, getRandomTwoClasses, getClassById } from '../config/classes.js';
import { getItemById } from '../config/items.js';
import { getSceneById } from '../config/scenes.js';
import { soundManager } from './SoundManager.js';

const LOCAL_STORAGE_KEY = 'web_souls_save_data_v1';

class GameState {
  constructor() {
    this.listeners = [];
    this.currentScreen = 'title'; // 'title' | 'menu' | 'character_select' | 'game'
    this.draftedClasses = [];
    this.activeNotification = null; // Banner de notificação estilo Dark Souls
    this.activeDialogue = null;     // Diálogo/Texto de inspeção atual

    this.player = null;
    this.worldState = this.getDefaultWorldState();
  }

  getDefaultWorldState() {
    return {
      currentScene: 'asylum_cell',
      sceneData: {
        asylum_cell: {
          doorUnlocked: false,
          groundItems: ['dungeon_key']
        },
        asylum_corridor: {
          doorUnlocked: true,
          groundItems: []
        }
      },
      flags: {
        cell_door_opened: false,
        oscar_corpse_examined: false
      }
    };
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this);
    }
  }

  setScreen(screen) {
    this.currentScreen = screen;
    this.notify();
  }

  /**
   * Inicia o processo de criação de personagem gerando 2 classes aleatórias
   */
  startNewGameDraft() {
    this.draftedClasses = getRandomTwoClasses();
    this.setScreen('character_select');
  }

  /**
   * Rerrola as duas classes aleatórias (modo Roguelike)
   */
  rerollDraft() {
    this.draftedClasses = getRandomTwoClasses();
    soundManager.playMenuMove();
    this.notify();
  }

  /**
   * Escolhe uma classe e inicia a jornada na prisão
   */
  selectClass(classId) {
    const classData = getClassById(classId);
    
    this.player = {
      name: "Escolhido dos Mortos-Vivos",
      classId: classData.id,
      className: classData.name,
      level: classData.level,
      souls: 0,
      humanity: 0,
      stats: { ...classData.stats },
      hp: classData.hp,
      maxHp: classData.hp,
      stamina: classData.stamina,
      maxStamina: classData.stamina,
      inventory: classData.startingItems.map(item => ({ ...getItemById(item.id), quantity: item.quantity })),
      equipped: {
        gear: [...classData.startingGear]
      }
    };

    // Reseta o estado do mundo para nova partida
    this.worldState = this.getDefaultWorldState();
    this.activeDialogue = {
      title: "Despertar no Abismo",
      text: "Você acorda nos confins mais escuros do Refúgio dos Mortos-Vivos do Norte. Uma alma compassiva arremessou um cadáver pelo teto antes de sumir."
    };

    soundManager.playMenuSelect();
    this.autoSave();
    this.setScreen('game');
  }

  /**
   * Retorna os itens presentes no chão do cenário atual
   */
  getCurrentSceneGroundItems() {
    const sceneId = this.worldState.currentScene;
    const sceneData = this.worldState.sceneData[sceneId];
    if (!sceneData || !sceneData.groundItems) return [];

    return sceneData.groundItems.map(itemId => getItemById(itemId));
  }

  /**
   * Pega um item do chão do cenário atual
   */
  pickupGroundItem(itemId) {
    const sceneId = this.worldState.currentScene;
    const sceneData = this.worldState.sceneData[sceneId];
    if (!sceneData) return;

    const itemIndex = sceneData.groundItems.indexOf(itemId);
    if (itemIndex === -1) return;

    // Remove do chão
    sceneData.groundItems.splice(itemIndex, 1);

    // Adiciona ao inventário do jogador
    const existing = this.player.inventory.find(i => i.id === itemId);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      this.player.inventory.push({ ...getItemById(itemId), quantity: 1 });
    }

    const item = getItemById(itemId);
    soundManager.playItemPickup();

    // Dispara banner clássico de Dark Souls
    this.showBanner(item.name, item.description, item.icon);
    this.autoSave();
    this.notify();
  }

  /**
   * Verifica se o jogador possui determinado item no inventário
   */
  hasItem(itemId) {
    if (!this.player || !this.player.inventory) return false;
    return this.player.inventory.some(i => i.id === itemId);
  }

  /**
   * Tenta destrancar a porta da cela
   */
  unlockCellDoor() {
    if (this.worldState.sceneData.asylum_cell.doorUnlocked) {
      return true;
    }

    if (!this.hasItem('dungeon_key')) {
      soundManager.playLockedError();
      this.setDialogue("Grade de Ferro Trancada", "A pesada porta de ferro não se move. Você precisa da Chave da Cela do Refúgio para abri-la.");
      return false;
    }

    // Sucesso ao destrancar
    this.worldState.sceneData.asylum_cell.doorUnlocked = true;
    this.worldState.flags.cell_door_opened = true;
    soundManager.playDoorUnlock();
    this.setDialogue(
      "Fechadura Aberta",
      "A Chave da Cela gira na fechadura enferrujada com um rangido metálico ecoante. As grades de ferro se abrem vagarosamente!"
    );
    this.autoSave();
    this.notify();
    return true;
  }

  /**
   * Viaja para outro cenário (ex: Corredor do Refúgio)
   */
  travelTo(sceneId) {
    if (!getSceneById(sceneId)) return;
    this.worldState.currentScene = sceneId;
    soundManager.playMenuSelect();

    const scene = getSceneById(sceneId);
    this.setDialogue(scene.title, scene.narrative);
    this.autoSave();
    this.notify();
  }

  /**
   * Define o diálogo/mensagem descritiva atual
   */
  setDialogue(title, text) {
    this.activeDialogue = { title, text };
    this.notify();
  }

  clearDialogue() {
    this.activeDialogue = null;
    this.notify();
  }

  /**
   * Exibe um banner de notificação estilo Dark Souls no meio da tela
   */
  showBanner(title, subtitle, icon) {
    this.activeNotification = { title, subtitle, icon };
    this.notify();
  }

  dismissBanner() {
    this.activeNotification = null;
    soundManager.playMenuMove();
    this.notify();
  }

  /**
   * Salvamento automático no LocalStorage
   */
  autoSave() {
    if (!this.player) return;
    try {
      const saveData = this.exportSaveData();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saveData));
    } catch (e) {
      console.warn("Falha ao salvar no LocalStorage:", e);
    }
  }

  /**
   * Verifica se existe jogo salvo no LocalStorage
   */
  hasSavedGame() {
    try {
      return Boolean(localStorage.getItem(LOCAL_STORAGE_KEY));
    } catch {
      return false;
    }
  }

  /**
   * Obtém resumo do save armazenado para mostrar no menu
   */
  getSaveSummary() {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      return {
        playerName: data.player?.name || "Desconhecido",
        className: data.player?.className || "Cavaleiro",
        level: data.player?.level || 1,
        scene: data.worldState?.currentScene || "asylum_cell",
        timestamp: data.timestamp ? new Date(data.timestamp).toLocaleString() : "Recente"
      };
    } catch {
      return null;
    }
  }

  /**
   * Carrega o jogo salvo do LocalStorage
   */
  loadFromLocalStorage() {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      return this.loadSaveData(data);
    } catch (e) {
      console.error("Erro ao carregar save:", e);
      return false;
    }
  }

  /**
   * Gera o objeto estruturado de Save
   */
  exportSaveData() {
    return {
      version: "0.1.0",
      timestamp: Date.now(),
      player: this.player,
      worldState: this.worldState
    };
  }

  /**
   * Restaura o jogo a partir de um objeto de save
   */
  loadSaveData(data) {
    if (!data || !data.player || !data.worldState) {
      throw new Error("Formato de arquivo de save inválido!");
    }

    this.player = data.player;
    this.worldState = data.worldState;
    this.activeDialogue = {
      title: "Jornada Restaurada",
      text: `Bem-vindo de volta, ${this.player.name} (${this.player.className}). Sua jornada continua no Refúgio dos Mortos-Vivos.`
    };

    soundManager.playMenuSelect();
    this.setScreen('game');
    return true;
  }

  /**
   * Baixa o arquivo de save (.json) para o disco do usuário
   */
  downloadSaveFile() {
    if (!this.player) {
      alert("Nenhuma partida ativa para salvar!");
      return;
    }

    const data = this.exportSaveData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `websouls_save_${this.player.className.toLowerCase()}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    soundManager.playItemPickup();
  }
}

export const gameState = new GameState();
