import { gameState } from '../core/GameState.js';
import { soundManager } from '../core/SoundManager.js';
import { AssetHelper } from '../core/AssetHelper.js';

export function renderCharacterSelect() {
  const container = document.createElement('div');
  container.className = 'screen character-select-screen';

  const [classA, classB] = gameState.draftedClasses;

  container.innerHTML = `
    <div class="screen-bg-overlay"></div>

    <header class="char-select-header">
      <h2 class="section-title">CRIAÇÃO DE PERSONAGEM</h2>
      <p class="section-subtitle">O DESTINO ESCOLHEU DUAS VOCAÇÕES ENTRE AS DEZ DE LORDRAN. ESCOLHA SEU CAMINHO:</p>
      
      <div class="draft-controls">
        <button class="btn-reroll" id="btn-reroll">
          <span>🎲</span> RERROLAR 2 CLASSES (MODO ROGUELIKE)
        </button>
        <button class="btn-cancel" id="btn-back-menu">
          VOLTAR AO MENU
        </button>
      </div>
    </header>

    <div class="classes-comparison-container">
      ${renderClassCardHtml(classA, 'class-a')}
      <div class="vs-divider">
        <div class="vs-line"></div>
        <span class="vs-badge">OU</span>
        <div class="vs-line"></div>
      </div>
      ${renderClassCardHtml(classB, 'class-b')}
    </div>
  `;

  // Anexa imagens com fallback para a classe A
  const imgContainerA = container.querySelector('#portrait-class-a');
  if (imgContainerA && classA) {
    const fallbackSvg = AssetHelper.getClassFallbackSvg(classA.id, classA.name);
    const portraitSrc = classA.portrait || `/assets/classes/${classA.id}.png`;
    const wrapper = AssetHelper.createImageWithFallback(portraitSrc, fallbackSvg);
    imgContainerA.appendChild(wrapper);
  }

  // Anexa imagens com fallback para a classe B
  const imgContainerB = container.querySelector('#portrait-class-b');
  if (imgContainerB && classB) {
    const fallbackSvg = AssetHelper.getClassFallbackSvg(classB.id, classB.name);
    const portraitSrc = classB.portrait || `/assets/classes/${classB.id}.png`;
    const wrapper = AssetHelper.createImageWithFallback(portraitSrc, fallbackSvg);
    imgContainerB.appendChild(wrapper);
  }

  // Event Listeners
  container.querySelector('#btn-choose-class-a')?.addEventListener('click', () => {
    gameState.selectClass(classA.id);
  });

  container.querySelector('#btn-choose-class-b')?.addEventListener('click', () => {
    gameState.selectClass(classB.id);
  });

  container.querySelector('#btn-reroll')?.addEventListener('click', () => {
    gameState.rerollDraft();
  });

  container.querySelector('#btn-back-menu')?.addEventListener('click', () => {
    soundManager.playMenuMove();
    gameState.setScreen('menu');
  });

  // Sons de hover nos botões de seleção
  container.querySelectorAll('.btn-select-class, .btn-reroll').forEach(btn => {
    btn.addEventListener('mouseenter', () => soundManager.playMenuMove());
  });

  return container;
}

function renderClassCardHtml(classData, prefix) {
  if (!classData) return '';

  const { stats, startingGear, startingItems } = classData;

  return `
    <article class="class-card ${prefix}">
      <div class="card-glow-border"></div>

      <div class="card-header">
        <div class="class-names">
          <h3 class="class-title">${classData.name.toUpperCase()}</h3>
          <span class="class-original-title">${classData.originalName}</span>
        </div>
        <div class="class-level-badge">
          <span class="lbl">NÍVEL</span>
          <span class="val">${classData.level}</span>
        </div>
      </div>

      <div class="card-portrait-box" id="portrait-${prefix}">
        <!-- Retrato real ou SVG fallback inserido via AssetHelper -->
      </div>

      <div class="class-description">
        <p>${classData.description}</p>
      </div>

      <div class="class-specs-grid">
        <!-- Tabela de Atributos Oficiais de DS1 -->
        <div class="specs-column attributes-column">
          <h4 class="specs-title">ATRIBUTOS</h4>
          <div class="stats-table">
            <div class="stat-row"><span class="s-name">Vitalidade (VIT)</span><span class="s-val">${stats.vitality}</span></div>
            <div class="stat-row"><span class="s-name">Sintonia (ATT)</span><span class="s-val">${stats.attunement}</span></div>
            <div class="stat-row"><span class="s-name">Estamina (END)</span><span class="s-val">${stats.endurance}</span></div>
            <div class="stat-row highlight-stat"><span class="s-name">Força (STR)</span><span class="s-val">${stats.strength}</span></div>
            <div class="stat-row highlight-stat"><span class="s-name">Destreza (DEX)</span><span class="s-val">${stats.dexterity}</span></div>
            <div class="stat-row"><span class="s-name">Resistência (RES)</span><span class="s-val">${stats.resistance}</span></div>
            <div class="stat-row"><span class="s-name">Inteligência (INT)</span><span class="s-val">${stats.intelligence}</span></div>
            <div class="stat-row"><span class="s-name">Fé (FAI)</span><span class="s-val">${stats.faith}</span></div>
            <div class="stat-row"><span class="s-name">Humanidade</span><span class="s-val">${stats.humanity}</span></div>
          </div>
        </div>

        <!-- Equipamentos e Itens Iniciais -->
        <div class="specs-column gear-column">
          <h4 class="specs-title">EQUIPAMENTO INICIAL</h4>
          <ul class="gear-list">
            ${startingGear.map(g => `
              <li class="gear-item">
                <span class="gear-bullet">⚔</span>
                <div>
                  <strong class="gear-name">${g.name}</strong>
                  <span class="gear-type">${g.type}</span>
                </div>
              </li>
            `).join('')}
          </ul>

          <h4 class="specs-title" style="margin-top: 10px;">ITENS ESPECIAIS</h4>
          <ul class="items-list">
            ${startingItems.map(i => `
              <li class="special-item">
                <span class="item-bullet">✦</span>
                <span class="item-name">${i.name}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div class="card-footer">
        <button class="btn-select-class" id="btn-choose-${prefix}">
          <span class="btn-icon">⚡</span>
          <span>ESCOLHER ${classData.name.toUpperCase()}</span>
        </button>
      </div>
    </article>
  `;
}
