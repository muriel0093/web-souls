import { gameState } from '../core/GameState.js';
import { soundManager } from '../core/SoundManager.js';
import { AssetHelper } from '../core/AssetHelper.js';
import { getSceneById } from '../config/scenes.js';

export function renderGameView() {
  const container = document.createElement('div');
  container.className = 'screen gameplay-screen';

  const player = gameState.player;
  const currentSceneId = gameState.worldState.currentScene;
  const scene = getSceneById(currentSceneId);
  const groundItems = gameState.getCurrentSceneGroundItems();
  const sceneData = gameState.worldState.sceneData[currentSceneId] || {};
  const isDoorUnlocked = Boolean(sceneData.doorUnlocked);
  const hasKey = gameState.hasItem('dungeon_key');

  container.innerHTML = `
    <!-- Top HUD estilo Dark Souls -->
    <header class="game-hud">
      <div class="hud-left-player">
        <div class="humanity-container" title="Contador de Humanidade">
          <span class="humanity-number">${String(player.humanity).padStart(2, '0')}</span>
        </div>

        <div class="bars-container">
          <!-- Barra de Vida (HP) -->
          <div class="bar-wrapper hp-wrapper">
            <div class="bar-fill hp-fill" style="width: 100%;">
              <span class="bar-shine"></span>
            </div>
            <div class="bar-label">HP ${player.hp} / ${player.maxHp}</div>
          </div>

          <!-- Barra de Estamina -->
          <div class="bar-wrapper stamina-wrapper">
            <div class="bar-fill stamina-fill" style="width: 100%;"></div>
            <div class="bar-label">ESTAMINA ${player.stamina} / ${player.maxStamina}</div>
          </div>
        </div>

        <div class="player-vocation-tag">
          <strong class="p-class">${player.className.toUpperCase()}</strong>
          <span class="p-level">SL ${player.level}</span>
        </div>
      </div>

      <div class="hud-right-stats">
        <div class="souls-counter">
          <span class="souls-icon">✧</span>
          <span class="souls-label">ALMAS:</span>
          <strong class="souls-amount">${player.souls}</strong>
        </div>

        <div class="hud-buttons">
          <button class="hud-btn" id="btn-open-inventory">
            🎒 INVENTÁRIO (${player.inventory.length})
          </button>
          <button class="hud-btn" id="btn-quick-save">
            💾 SALVAR
          </button>
          <button class="hud-btn" id="btn-toggle-sound-hud">
            ${soundManager.isMuted() ? '🔇' : '🔊'}
          </button>
          <button class="hud-btn btn-exit" id="btn-exit-to-menu">
            MENU
          </button>
        </div>
      </div>
    </header>

    <!-- Layout Principal: Cenário + Painéis de Interação -->
    <main class="gameplay-main-layout">
      
      <!-- Coluna da Esquerda: Cenário Visual Principal -->
      <section class="scene-viewport-section">
        <div class="scene-frame-container" id="scene-bg-box">
          <div class="scene-vignette-overlay"></div>
          
          <div class="scene-header-tag">
            <span class="tag-pin">◈</span>
            <span class="tag-title">${scene.title.toUpperCase()}</span>
          </div>

          <!-- Indicador visual caso a porta da cela esteja aberta -->
          ${currentSceneId === 'asylum_cell' && isDoorUnlocked ? `
            <div class="door-status-indicator unlocked">
              <span class="indicator-icon">🔓</span>
              <span>GRADE DE FERRO DESTRANCADA E ABERTA</span>
            </div>
          ` : ''}

          <!-- Botões de clique direto dentro da cena (Point and Click Hotspots) -->
          <div class="scene-hotspots-layer">
            ${currentSceneId === 'asylum_cell' ? `
              <button class="hotspot-btn door-hotspot" id="hotspot-door" title="Porta de ferro da cela">
                <span class="hotspot-marker">✦</span>
                <span class="hotspot-tooltip">${isDoorUnlocked ? 'Porta Aberta (Avançar)' : 'Grade Trancada'}</span>
              </button>

              <button class="hotspot-btn ceiling-hotspot" id="hotspot-ceiling" title="Teto Quebrado">
                <span class="hotspot-marker">✦</span>
                <span class="hotspot-tooltip">Teto Quebrado</span>
              </button>

              <button class="hotspot-btn corpse-hotspot" id="hotspot-corpse" title="Cadáver no Chão">
                <span class="hotspot-marker">✦</span>
                <span class="hotspot-tooltip">Cadáver Caído</span>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Painel de Diálogo / Narrativa na base do cenário -->
        <div class="narrative-dialogue-panel" id="dialogue-panel">
          <div class="dialogue-header">
            <span class="d-icon">⚜</span>
            <h4 class="dialogue-title" id="dialogue-title">${gameState.activeDialogue?.title || scene.title}</h4>
          </div>
          <p class="dialogue-content" id="dialogue-text">
            ${gameState.activeDialogue?.text || scene.narrative}
          </p>
        </div>
      </section>

      <!-- Coluna da Direita: ITENS NO CHÃO + AÇÕES DO CENÁRIO -->
      <aside class="sidebar-panels">
        
        <!-- Bloco 1: ITENS NO CHÃO (Requerimento Central) -->
        <div class="ground-items-panel">
          <div class="panel-header">
            <span class="ph-icon">📦</span>
            <h3 class="ph-title">ITENS NO CHÃO</h3>
            <span class="ph-badge">${groundItems.length}</span>
          </div>

          <div class="ground-items-list" id="ground-items-container">
            ${groundItems.length === 0 ? `
              <div class="empty-ground-message">
                <span class="empty-icon">🪹</span>
                <p>Nenhum item restante no chão deste local.</p>
              </div>
            ` : groundItems.map(item => `
              <div class="ground-item-card" data-item-id="${item.id}" id="ground-item-${item.id}">
                <div class="item-icon-wrapper" id="item-icon-box-${item.id}">
                  <!-- Ícone inserido via AssetHelper -->
                </div>
                <div class="item-info">
                  <strong class="item-name">${item.name}</strong>
                  <span class="item-type-badge">${item.type === 'key' ? 'Chave de Ferro' : 'Item'}</span>
                  <p class="item-prompt">Clique para pegar</p>
                </div>
                <button class="btn-loot-item" title="Pegar ${item.name}">
                  PEGAR
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Bloco 2: AÇÕES DISPONÍVEIS DO CENÁRIO -->
        <div class="scene-actions-panel">
          <div class="panel-header">
            <span class="ph-icon">⚔</span>
            <h3 class="ph-title">AÇÕES DO CENÁRIO</h3>
          </div>

          <div class="actions-buttons-list">
            ${currentSceneId === 'asylum_cell' ? `
              <!-- Ação de Examinar / Destrancar a Grade -->
              ${!isDoorUnlocked ? `
                <button class="action-btn" id="btn-action-examine-door">
                  <span class="action-bullet">🚪</span>
                  <div class="action-text-col">
                    <strong>Examinar Grade de Ferro</strong>
                    <span>Inspecionar a fechadura da cela</span>
                  </div>
                </button>

                ${hasKey ? `
                  <button class="action-btn highlight-gold pulse-action" id="btn-action-unlock-door">
                    <span class="action-bullet">🔑</span>
                    <div class="action-text-col">
                      <strong>Destrancar Porta com a Chave</strong>
                      <span>Usar a Chave da Cela do Refúgio</span>
                    </div>
                  </button>
                ` : `
                  <button class="action-btn disabled" disabled>
                    <span class="action-bullet">🔒</span>
                    <div class="action-text-col">
                      <strong>Porta Trancada</strong>
                      <span>Você precisa encontrar a chave</span>
                    </div>
                  </button>
                `}
              ` : `
                <!-- Porta já destrancada: Opção de Avançar -->
                <button class="action-btn highlight-advance pulse-action" id="btn-action-advance-corridor">
                  <span class="action-bullet">➔</span>
                  <div class="action-text-col">
                    <strong>Avançar para o Corredor</strong>
                    <span>Sair da cela e explorar o Refúgio</span>
                  </div>
                </button>
              `}

              <!-- Outras interações da cela -->
              <button class="action-btn" id="btn-action-examine-corpse">
                <span class="action-bullet">💀</span>
                <div class="action-text-col">
                  <strong>Examinar Cadáver</strong>
                  <span>Verificar o corpo atirado do teto</span>
                </div>
              </button>

              <button class="action-btn" id="btn-action-examine-ceiling">
                <span class="action-bullet">👁</span>
                <div class="action-text-col">
                  <strong>Olhar para o Teto Quebrado</strong>
                  <span>Buscar sinais do cavaleiro misterioso</span>
                </div>
              </button>
            ` : `
              <!-- Ações no Corredor do Refúgio -->
              <button class="action-btn" id="btn-action-read-sign">
                <span class="action-bullet">📜</span>
                <div class="action-text-col">
                  <strong>Ler Mensagem no Chão</strong>
                  <span>Inscrição reluzente em brasa</span>
                </div>
              </button>

              <button class="action-btn" id="btn-action-look-hallway">
                <span class="action-bullet">🕯</span>
                <div class="action-text-col">
                  <strong>Examinar o Pátio à Frente</strong>
                  <span>Avistar a primeira fogueira</span>
                </div>
              </button>

              <button class="action-btn" id="btn-action-return-cell">
                <span class="action-bullet">⬅</span>
                <div class="action-text-col">
                  <strong>Voltar para a Cela</strong>
                  <span>Retornar ao local de despertar</span>
                </div>
              </button>
            `}
          </div>
        </div>

      </aside>
    </main>

    <!-- Modal de Banner de Notificação de Item Estilo Dark Souls -->
    ${gameState.activeNotification ? `
      <div class="souls-banner-backdrop" id="notification-banner">
        <div class="souls-banner-container">
          <div class="banner-top-line"></div>
          <div class="banner-content">
            <div class="banner-icon-box" id="banner-icon-box"></div>
            <div class="banner-text">
              <h3 class="banner-title">${gameState.activeNotification.title.toUpperCase()}</h3>
              <p class="banner-subtitle">${gameState.activeNotification.subtitle}</p>
            </div>
          </div>
          <div class="banner-bottom-line"></div>
          <button class="banner-close-btn" id="btn-dismiss-banner">OK (Clique para fechar)</button>
        </div>
      </div>
    ` : ''}

    <!-- Modal de Inventário -->
    <div class="souls-modal-backdrop" id="inventory-modal" style="display: none;">
      <div class="souls-modal-box inventory-box">
        <h3 class="modal-title">INVENTÁRIO & EQUIPAMENTOS</h3>
        <div class="inventory-grid">
          <div class="inv-section">
            <h4 class="inv-subtitle">ITENS CARREGADOS</h4>
            <div class="inv-items-list">
              ${player.inventory.map(item => `
                <div class="inv-item-row">
                  <div class="inv-item-left">
                    <span class="inv-bullet">◈</span>
                    <div>
                      <strong class="inv-name">${item.name}</strong>
                      <p class="inv-desc">${item.description}</p>
                    </div>
                  </div>
                  <span class="inv-qty">x${item.quantity || 1}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="inv-section">
            <h4 class="inv-subtitle">EQUIPAMENTO DA CLASSE</h4>
            <div class="inv-gear-list">
              ${player.equipped.gear.map(g => `
                <div class="inv-gear-row">
                  <span class="gear-icon">⚔</span>
                  <div>
                    <strong class="gear-name">${g.name}</strong>
                    <span class="gear-type">${g.type}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="souls-btn-confirm" id="btn-close-inventory">FECHAR INVENTÁRIO</button>
        </div>
      </div>
    </div>
  `;

  // Anexa o fundo do cenário (com imagem real ou fallback SVG)
  const sceneBgBox = container.querySelector('#scene-bg-box');
  if (sceneBgBox) {
    const fallbackSvg = currentSceneId === 'asylum_cell' 
      ? AssetHelper.getAsylumCellFallbackSvg() 
      : `<div class="corridor-fallback-box"><p>Corredor do Refúgio dos Mortos-Vivos</p></div>`;
    const bgWrapper = AssetHelper.createImageWithFallback(scene.background, fallbackSvg, 'scene-background-wrapper');
    sceneBgBox.prepend(bgWrapper);
  }

  // Anexa ícones dos itens no chão
  groundItems.forEach(item => {
    const iconBox = container.querySelector(`#item-icon-box-${item.id}`);
    if (iconBox) {
      const fallbackSvg = AssetHelper.getItemFallbackSvg(item.id, item.name);
      const imgWrapper = AssetHelper.createImageWithFallback(item.icon, fallbackSvg, 'ground-item-icon-wrapper');
      iconBox.appendChild(imgWrapper);
    }
  });

  // Anexa ícone do banner se estiver ativo
  if (gameState.activeNotification) {
    const bannerBox = container.querySelector('#banner-icon-box');
    if (bannerBox) {
      const fallbackSvg = AssetHelper.getItemFallbackSvg(
        gameState.activeNotification.title.includes('Chave') ? 'dungeon_key' : 'default',
        gameState.activeNotification.title
      );
      bannerBox.innerHTML = fallbackSvg;
    }
  }

  // Interação ao clicar no item no chão
  groundItems.forEach(item => {
    const card = container.querySelector(`#ground-item-${item.id}`);
    if (card) {
      card.addEventListener('click', () => {
        gameState.pickupGroundItem(item.id);
      });
    }
  });

  // Ações de Botões do Cenário
  container.querySelector('#btn-action-examine-door')?.addEventListener('click', () => {
    soundManager.playMenuMove();
    if (isDoorUnlocked) {
      gameState.setDialogue("Grade Destrancada", scene.details.door_unlocked_msg);
    } else if (hasKey) {
      gameState.setDialogue("Chave em Mãos", "Você tem a Chave da Cela do Refúgio. Clique em 'Destrancar Porta com a Chave' para abri-la!");
    } else {
      soundManager.playLockedError();
      gameState.setDialogue("Grade Trancada", scene.details.door_locked_msg);
    }
  });

  container.querySelector('#btn-action-unlock-door')?.addEventListener('click', () => {
    gameState.unlockCellDoor();
  });

  container.querySelector('#btn-action-advance-corridor')?.addEventListener('click', () => {
    gameState.travelTo('asylum_corridor');
  });

  container.querySelector('#btn-action-examine-corpse')?.addEventListener('click', () => {
    soundManager.playMenuMove();
    gameState.setDialogue("Cadáver Misterioso", scene.details.examine_corpse);
  });

  container.querySelector('#btn-action-examine-ceiling')?.addEventListener('click', () => {
    soundManager.playMenuMove();
    gameState.setDialogue("Teto Desmoronado", scene.details.examine_ceiling);
  });

  // Ações no Corredor
  container.querySelector('#btn-action-read-sign')?.addEventListener('click', () => {
    soundManager.playMenuSelect();
    gameState.setDialogue("Inscrição de Pedra Laranja", scene.details.read_soapstone);
  });

  container.querySelector('#btn-action-look-hallway')?.addEventListener('click', () => {
    soundManager.playMenuMove();
    gameState.setDialogue("Vislumbre da Fogueira", scene.details.look_ahead);
  });

  container.querySelector('#btn-action-return-cell')?.addEventListener('click', () => {
    gameState.travelTo('asylum_cell');
  });

  // Hotspots diretos na cena (Point and Click com o mouse)
  container.querySelector('#hotspot-door')?.addEventListener('click', () => {
    if (isDoorUnlocked) {
      gameState.travelTo('asylum_corridor');
    } else if (hasKey) {
      gameState.unlockCellDoor();
    } else {
      soundManager.playLockedError();
      gameState.setDialogue("Grade Trancada", scene.details.door_locked_msg);
    }
  });

  container.querySelector('#hotspot-ceiling')?.addEventListener('click', () => {
    soundManager.playMenuMove();
    gameState.setDialogue("Teto Desmoronado", scene.details.examine_ceiling);
  });

  container.querySelector('#hotspot-corpse')?.addEventListener('click', () => {
    soundManager.playMenuMove();
    if (groundItems.some(i => i.id === 'dungeon_key')) {
      gameState.pickupGroundItem('dungeon_key');
    } else {
      gameState.setDialogue("Cadáver no Chão", "Apenas ossos e vestes rotas. A chave que ele carregava já está em seu inventário.");
    }
  });

  // Fechar banner
  container.querySelector('#btn-dismiss-banner')?.addEventListener('click', () => {
    gameState.dismissBanner();
  });

  // Modal de Inventário
  const invModal = container.querySelector('#inventory-modal');
  container.querySelector('#btn-open-inventory')?.addEventListener('click', () => {
    soundManager.playMenuSelect();
    invModal.style.display = 'flex';
  });

  container.querySelector('#btn-close-inventory')?.addEventListener('click', () => {
    soundManager.playMenuMove();
    invModal.style.display = 'none';
  });

  // Salvar Rápido / Exportar
  container.querySelector('#btn-quick-save')?.addEventListener('click', () => {
    gameState.autoSave();
    soundManager.playItemPickup();
    gameState.setDialogue(
      "Jogo Salvo",
      "O progresso da sua jornada foi salvo no navegador. Você também pode exportar seu arquivo de save a qualquer momento no Menu Principal."
    );
  });

  // Toggle de Som no HUD
  container.querySelector('#btn-toggle-sound-hud')?.addEventListener('click', (e) => {
    const muted = soundManager.toggleMute();
    e.target.textContent = muted ? '🔇' : '🔊';
  });

  // Menu Principal
  container.querySelector('#btn-exit-to-menu')?.addEventListener('click', () => {
    soundManager.playMenuMove();
    gameState.autoSave();
    gameState.setScreen('menu');
  });

  return container;
}
