import { gameState } from '../core/GameState.js';
import { soundManager } from '../core/SoundManager.js';

export function renderMainMenu() {
  const container = document.createElement('div');
  container.className = 'screen menu-screen';

  const hasSave = gameState.hasSavedGame();
  const saveSummary = gameState.getSaveSummary();

  container.innerHTML = `
    <div class="menu-bg-overlay"></div>

    <div class="menu-layout">
      <div class="menu-header">
        <div class="menu-logo-box">
          <img src="/assets/ui/dark_souls_logo.png" alt="Dark Souls" class="menu-souls-logo" />
        </div>
        <h2 class="menu-title">WEB SOULS</h2>
        <div class="menu-subline">PRINCIPAL MENU</div>
      </div>

      <nav class="menu-nav">
        <button class="menu-btn" id="btn-new-game">
          <span class="btn-flame">🔥</span>
          <span class="btn-text">NOVO JOGO</span>
          <span class="btn-desc">Iniciar nova jornada e sortear classes</span>
        </button>

        <button class="menu-btn ${!hasSave ? 'disabled' : ''}" id="btn-continue" ${!hasSave ? 'disabled' : ''}>
          <span class="btn-flame">🔥</span>
          <div class="btn-col">
            <span class="btn-text">CONTINUAR</span>
            ${saveSummary 
              ? `<span class="btn-desc">Continuar com ${saveSummary.className} (Nível ${saveSummary.level})</span>` 
              : `<span class="btn-desc">Nenhum save automático detectado</span>`}
          </div>
        </button>

        <button class="menu-btn" id="btn-load-file">
          <span class="btn-flame">🔥</span>
          <div class="btn-col">
            <span class="btn-text">CARREGAR ARQUIVO DE SAVE</span>
            <span class="btn-desc">Importar arquivo .json ou .txt do computador</span>
          </div>
        </button>

        <button class="menu-btn ${!gameState.player ? 'disabled' : ''}" id="btn-export-save" ${!gameState.player ? 'disabled' : ''}>
          <span class="btn-flame">🔥</span>
          <div class="btn-col">
            <span class="btn-text">EXPORTAR SAVE ATUAL</span>
            <span class="btn-desc">Baixar websouls_save.json para seu disco</span>
          </div>
        </button>

        <button class="menu-btn" id="btn-credits">
          <span class="btn-flame">🔥</span>
          <span class="btn-text">CRÉDITOS & LORE</span>
          <span class="btn-desc">Informações do protótipo e Dark Souls</span>
        </button>
      </nav>

      <!-- Input invisível para upload de arquivo de save -->
      <input type="file" id="save-file-input" accept=".json,.txt" style="display: none;" />

      <div class="menu-bottom-controls">
        <button class="btn-small-control" id="btn-toggle-sound">
          🔊 SOM: ${soundManager.isMuted() ? 'DESLIGADO' : 'LIGADO'}
        </button>
        <button class="btn-small-control" id="btn-back-title">
          VOLTAR AO INÍCIO
        </button>
      </div>
    </div>

    <!-- Modal de Créditos -->
    <div class="souls-modal-backdrop" id="credits-modal" style="display: none;">
      <div class="souls-modal-box">
        <h3 class="modal-title">WEB SOULS - CRÉDITOS & DESIGN</h3>
        <div class="modal-body">
          <p><strong>Conceito:</strong> Adaptação Point & Click Roguelike de Dark Souls: Remastered feita para rodar em navegadores.</p>
          <p><strong>Desenvolvimento:</strong> Feito com HTML5, CSS3 moderno e Vanilla JavaScript (Vite). Totalmente modular para expansões.</p>
          <p><strong>Assets:</strong> As imagens podem ser adicionadas manualmente pelo desenvolvedor na pasta <code>public/assets/</code>.</p>
          <p><strong>Tributo:</strong> Dark Souls é propriedade intelectual de Bandai Namco Entertainment Inc. e FromSoftware, Inc. Hidetaka Miyazaki.</p>
        </div>
        <div class="modal-footer">
          <button class="souls-btn-confirm" id="btn-close-credits">FECHAR</button>
        </div>
      </div>
    </div>
  `;

  // Sons de hover nos botões
  container.querySelectorAll('.menu-btn:not(.disabled)').forEach(btn => {
    btn.addEventListener('mouseenter', () => soundManager.playMenuMove());
  });

  // Ações
  container.querySelector('#btn-new-game').addEventListener('click', () => {
    soundManager.playMenuSelect();
    gameState.startNewGameDraft();
  });

  const btnContinue = container.querySelector('#btn-continue');
  if (btnContinue && hasSave) {
    btnContinue.addEventListener('click', () => {
      soundManager.playMenuSelect();
      gameState.loadFromLocalStorage();
    });
  }

  // Carregar Arquivo de Save (.json ou .txt)
  const fileInput = container.querySelector('#save-file-input');
  container.querySelector('#btn-load-file').addEventListener('click', () => {
    soundManager.playMenuSelect();
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const json = JSON.parse(text);
        gameState.loadSaveData(json);
      } catch (err) {
        alert("Erro ao ler arquivo de save: certifique-se de que é um JSON ou TXT válido do Web Souls.\n" + err.message);
      }
    };
    reader.readAsText(file);
  });

  // Exportar save atual
  const btnExport = container.querySelector('#btn-export-save');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      gameState.downloadSaveFile();
    });
  }

  // Modal de Créditos
  const creditsModal = container.querySelector('#credits-modal');
  container.querySelector('#btn-credits').addEventListener('click', () => {
    soundManager.playMenuSelect();
    creditsModal.style.display = 'flex';
  });

  container.querySelector('#btn-close-credits').addEventListener('click', () => {
    soundManager.playMenuMove();
    creditsModal.style.display = 'none';
  });

  // Toggle de Som
  container.querySelector('#btn-toggle-sound').addEventListener('click', (e) => {
    const muted = soundManager.toggleMute();
    e.target.textContent = `🔊 SOM: ${muted ? 'DESLIGADO' : 'LIGADO'}`;
  });

  // Voltar ao título
  container.querySelector('#btn-back-title').addEventListener('click', () => {
    soundManager.playMenuMove();
    gameState.setScreen('title');
  });

  return container;
}
