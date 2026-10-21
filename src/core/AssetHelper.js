/**
 * Utilitário de Assets com Fallback Visual Temático de Dark Souls.
 * Se o usuário colocar o arquivo de imagem na pasta indicada em public/assets/,
 * a imagem real é exibida. Caso o arquivo ainda não exista, gera uma
 * elegante ilustração vetorial (SVG) com estética Dark Souls.
 */

export const AssetHelper = {
  /**
   * Retorna um elemento ou SVG representativo de uma classe de Dark Souls
   */
  getClassFallbackSvg(classId, className) {
    const icons = {
      warrior: `
        <svg viewBox="0 0 200 240" class="souls-svg-art">
          <defs>
            <linearGradient id="grad-steel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4a5568" />
              <stop offset="50%" stop-color="#2d3748" />
              <stop offset="100%" stop-color="#1a202c" />
            </linearGradient>
            <linearGradient id="grad-gold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ecc94b" />
              <stop offset="100%" stop-color="#b7791f" />
            </linearGradient>
          </defs>
          <rect width="200" height="240" fill="#0d0f12" />
          <path d="M100 25 L160 55 V145 C160 185 100 215 100 215 C100 215 40 185 40 145 V55 Z" fill="url(#grad-steel)" stroke="url(#grad-gold)" stroke-width="3" />
          <!-- Espada do Guerreiro cruzada -->
          <line x1="70" y1="60" x2="130" y2="170" stroke="#cbd5e0" stroke-width="4" stroke-linecap="round" />
          <line x1="130" y1="60" x2="70" y2="170" stroke="#cbd5e0" stroke-width="4" stroke-linecap="round" />
          <circle cx="100" cy="115" r="14" fill="#d69e2e" stroke="#744210" stroke-width="2" />
          <text x="100" y="232" text-anchor="middle" fill="#d69e2e" font-family="'Cinzel', serif" font-size="11" letter-spacing="2">GUERREIRO</text>
        </svg>`,
      knight: `
        <svg viewBox="0 0 200 240" class="souls-svg-art">
          <defs>
            <linearGradient id="grad-plate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#718096" />
              <stop offset="50%" stop-color="#4a5568" />
              <stop offset="100%" stop-color="#1a202c" />
            </linearGradient>
          </defs>
          <rect width="200" height="240" fill="#0d0f12" />
          <!-- Elmo Fechado de Cavaleiro de Elite -->
          <path d="M60 70 C60 40 140 40 140 70 V130 C140 160 100 180 100 180 C100 180 60 160 60 130 Z" fill="url(#grad-plate)" stroke="#c5a059" stroke-width="3" />
          <!-- Visor em T clássico -->
          <rect x="75" y="95" width="50" height="8" rx="2" fill="#090a0c" stroke="#c5a059" stroke-width="1.5" />
          <line x1="100" y1="75" x2="100" y2="140" stroke="#c5a059" stroke-width="2" />
          <!-- Brasão de Astora -->
          <path d="M92 145 L100 135 L108 145 L100 155 Z" fill="#c5a059" />
          <text x="100" y="232" text-anchor="middle" fill="#c5a059" font-family="'Cinzel', serif" font-size="11" letter-spacing="2">CAVALEIRO</text>
        </svg>`,
      wanderer: `
        <svg viewBox="0 0 200 240" class="souls-svg-art">
          <rect width="200" height="240" fill="#0d0f12" />
          <!-- Capuz de Andarilho e Cimitarra Curva -->
          <path d="M50 140 C50 60 150 60 150 140 C130 160 70 160 50 140 Z" fill="#3c362a" stroke="#8c7853" stroke-width="2" />
          <!-- Sombra do rosto -->
          <ellipse cx="100" cy="120" rx="35" ry="25" fill="#090a0c" />
          <!-- Olhar penetrante -->
          <circle cx="88" cy="118" r="2" fill="#e2d9c8" />
          <circle cx="112" cy="118" r="2" fill="#e2d9c8" />
          <!-- Lâmina curva da Cimitarra -->
          <path d="M50 190 Q110 150 155 180" fill="none" stroke="#cbd5e0" stroke-width="3" />
          <text x="100" y="232" text-anchor="middle" fill="#c5a059" font-family="'Cinzel', serif" font-size="11" letter-spacing="2">ANDARILHO</text>
        </svg>`,
      thief: `
        <svg viewBox="0 0 200 240" class="souls-svg-art">
          <rect width="200" height="240" fill="#0d0f12" />
          <!-- Máscara de Couro Negro e Adaga -->
          <path d="M60 60 C80 40 120 40 140 60 V130 C140 160 100 175 100 175 C100 175 60 160 60 130 Z" fill="#18181b" stroke="#71717a" stroke-width="2" />
          <path d="M70 100 L130 100" stroke="#a1a1aa" stroke-width="2" />
          <!-- Faca de Bandido -->
          <line x1="100" y1="50" x2="100" y2="150" stroke="#f43f5e" stroke-width="3" />
          <text x="100" y="232" text-anchor="middle" fill="#c5a059" font-family="'Cinzel', serif" font-size="11" letter-spacing="2">LADRÃO</text>
        </svg>`,
      bandit: `
        <svg viewBox="0 0 200 240" class="souls-svg-art">
          <rect width="200" height="240" fill="#0d0f12" />
          <!-- Machado de Batalha de Duas Lâminas -->
          <line x1="100" y1="40" x2="100" y2="180" stroke="#78350f" stroke-width="6" />
          <path d="M100 50 C60 60 60 110 100 120 Z" fill="#475569" stroke="#94a3b8" stroke-width="2" />
          <path d="M100 50 C140 60 140 110 100 120 Z" fill="#475569" stroke="#94a3b8" stroke-width="2" />
          <text x="100" y="232" text-anchor="middle" fill="#c5a059" font-family="'Cinzel', serif" font-size="11" letter-spacing="2">BANDIDO</text>
        </svg>`,
      hunter: `
        <svg viewBox="0 0 200 240" class="souls-svg-art">
          <rect width="200" height="240" fill="#0d0f12" />
          <!-- Arco e Flecha -->
          <path d="M70 40 Q40 110 70 180" fill="none" stroke="#92400e" stroke-width="5" stroke-linecap="round" />
          <line x1="70" y1="40" x2="70" y2="180" stroke="#fef08a" stroke-width="1.5" />
          <line x1="50" y1="110" x2="150" y2="110" stroke="#e2e8f0" stroke-width="3" />
          <polygon points="150,105 165,110 150,115" fill="#c5a059" />
          <text x="100" y="232" text-anchor="middle" fill="#c5a059" font-family="'Cinzel', serif" font-size="11" letter-spacing="2">CAÇADOR</text>
        </svg>`,
      sorcerer: `
        <svg viewBox="0 0 200 240" class="souls-svg-art">
          <rect width="200" height="240" fill="#0d0f12" />
          <!-- Catalisador de Vinheim e Brilho de Alma Azul -->
          <circle cx="100" cy="80" r="30" fill="radial-gradient(circle, #38bdf8 0%, transparent 70%)" opacity="0.8" />
          <circle cx="100" cy="80" r="16" fill="#0284c7" stroke="#bae6fd" stroke-width="2" />
          <line x1="100" y1="96" x2="100" y2="190" stroke="#78350f" stroke-width="5" />
          <text x="100" y="232" text-anchor="middle" fill="#38bdf8" font-family="'Cinzel', serif" font-size="11" letter-spacing="2">FEITICEIRO</text>
        </svg>`,
      pyromancer: `
        <svg viewBox="0 0 200 240" class="souls-svg-art">
          <defs>
            <linearGradient id="grad-fire" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#b91c1c" />
              <stop offset="50%" stop-color="#ea580c" />
              <stop offset="100%" stop-color="#fde047" />
            </linearGradient>
          </defs>
          <rect width="200" height="240" fill="#0d0f12" />
          <!-- Chama Primordial do Grande Pântano -->
          <path d="M100 40 C120 70 145 90 145 125 C145 160 120 180 100 180 C80 180 55 160 55 125 C55 90 80 70 100 40 Z" fill="url(#grad-fire)" />
          <path d="M100 75 C110 95 125 110 125 130 C125 150 110 165 100 165 C90 165 75 150 75 130 C75 110 90 95 100 75 Z" fill="#fef08a" />
          <text x="100" y="232" text-anchor="middle" fill="#ea580c" font-family="'Cinzel', serif" font-size="11" letter-spacing="2">PIROMANTE</text>
        </svg>`,
      cleric: `
        <svg viewBox="0 0 200 240" class="souls-svg-art">
          <rect width="200" height="240" fill="#0d0f12" />
          <!-- Cruz Solar e Talismã de Lona -->
          <circle cx="100" cy="100" r="45" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="4,4" />
          <line x1="100" y1="45" x2="100" y2="175" stroke="#fef08a" stroke-width="5" />
          <line x1="65" y1="85" x2="135" y2="85" stroke="#fef08a" stroke-width="5" />
          <circle cx="100" cy="85" r="8" fill="#d97706" />
          <text x="100" y="232" text-anchor="middle" fill="#fbbf24" font-family="'Cinzel', serif" font-size="11" letter-spacing="2">CLÉRIGO</text>
        </svg>`,
      deprived: `
        <svg viewBox="0 0 200 240" class="souls-svg-art">
          <rect width="200" height="240" fill="#0d0f12" />
          <!-- Porrete de Madeira Rústico -->
          <path d="M92 40 L108 40 L115 140 L105 180 L95 180 L85 140 Z" fill="#57361a" stroke="#854d0e" stroke-width="2" />
          <circle cx="100" cy="65" r="4" fill="#3d2310" />
          <circle cx="104" cy="95" r="3" fill="#3d2310" />
          <text x="100" y="232" text-anchor="middle" fill="#a1a1aa" font-family="'Cinzel', serif" font-size="11" letter-spacing="2">DESPROVIDO</text>
        </svg>`
    };

    return icons[classId] || icons.warrior;
  },

  /**
   * Retorna um elemento ou SVG representativo de itens de Dark Souls
   */
  getItemFallbackSvg(itemId, itemName) {
    if (itemId === "dungeon_key" || itemId === "master_key") {
      return `
        <svg viewBox="0 0 80 80" class="souls-item-svg">
          <circle cx="28" cy="28" r="14" fill="none" stroke="#c5a059" stroke-width="4" />
          <circle cx="28" cy="28" r="6" fill="#18181b" stroke="#c5a059" stroke-width="2" />
          <line x1="38" y1="38" x2="65" y2="65" stroke="#c5a059" stroke-width="5" stroke-linecap="round" />
          <line x1="55" y1="55" x2="63" y2="47" stroke="#c5a059" stroke-width="4" stroke-linecap="round" />
          <line x1="62" y1="62" x2="70" y2="54" stroke="#c5a059" stroke-width="4" stroke-linecap="round" />
        </svg>`;
    }

    if (itemId === "estus_flask") {
      return `
        <svg viewBox="0 0 80 80" class="souls-item-svg">
          <defs>
            <linearGradient id="grad-estus" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10b981" />
              <stop offset="70%" stop-color="#047857" />
              <stop offset="100%" stop-color="#064e3b" />
            </linearGradient>
          </defs>
          <path d="M35 15 H45 V25 H55 C60 25 65 30 65 40 C65 60 55 70 40 70 C25 70 15 60 15 40 C15 30 20 25 25 25 H35 Z" fill="url(#grad-estus)" stroke="#c5a059" stroke-width="2" />
          <circle cx="40" cy="45" r="8" fill="#fef08a" opacity="0.8" />
        </svg>`;
    }

    // Fallback padrão para armas / espadas
    return `
      <svg viewBox="0 0 80 80" class="souls-item-svg">
        <line x1="18" y1="62" x2="62" y2="18" stroke="#cbd5e0" stroke-width="4" stroke-linecap="round" />
        <line x1="26" y1="46" x2="34" y2="54" stroke="#c5a059" stroke-width="4" />
        <circle cx="16" cy="64" r="4" fill="#c5a059" />
      </svg>`;
  },

  /**
   * Retorna o SVG da cela do Refúgio dos Mortos-Vivos caso a imagem de fundo não exista
   */
  getAsylumCellFallbackSvg() {
    return `
      <svg viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" class="souls-scene-bg-svg">
        <defs>
          <linearGradient id="stone-wall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0e1116" />
            <stop offset="50%" stop-color="#161a22" />
            <stop offset="100%" stop-color="#090b0e" />
          </linearGradient>
          <radialGradient id="hole-light" cx="65%" cy="15%" r="40%">
            <stop offset="0%" stop-color="#475569" stop-opacity="0.45" />
            <stop offset="40%" stop-color="#334155" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#000000" stop-opacity="0" />
          </radialGradient>
        </defs>
        <!-- Paredes de pedra escura -->
        <rect width="1200" height="675" fill="url(#stone-wall)" />
        
        <!-- Fresta do teto quebrado onde Oscar jogou o corpo -->
        <circle cx="780" cy="100" r="140" fill="url(#hole-light)" />
        <polygon points="720,0 880,0 860,70 820,110 750,90 710,40" fill="#2d3748" opacity="0.6" />
        <polygon points="730,0 850,0 830,50 770,70" fill="#94a3b8" opacity="0.3" />

        <!-- Feixes de luz pálida entrando pelo teto -->
        <polygon points="760,60 840,60 1000,675 600,675" fill="#e2e8f0" opacity="0.04" />

        <!-- Piso de lajotas de pedra desgastadas -->
        <line x1="0" y1="460" x2="1200" y2="460" stroke="#252b36" stroke-width="4" />
        <line x1="0" y1="540" x2="1200" y2="540" stroke="#1d222b" stroke-width="3" />
        <line x1="0" y1="620" x2="1200" y2="620" stroke="#15181f" stroke-width="3" />
        
        <!-- Grades de Ferro da Porta da Cela (lado esquerdo) -->
        <rect x="80" y="140" width="220" height="340" fill="#07080a" stroke="#2c3038" stroke-width="8" />
        <line x1="120" y1="140" x2="120" y2="480" stroke="#3b4252" stroke-width="6" />
        <line x1="150" y1="140" x2="150" y2="480" stroke="#3b4252" stroke-width="6" />
        <line x1="180" y1="140" x2="180" y2="480" stroke="#3b4252" stroke-width="6" />
        <line x1="210" y1="140" x2="210" y2="480" stroke="#3b4252" stroke-width="6" />
        <line x1="240" y1="140" x2="240" y2="480" stroke="#3b4252" stroke-width="6" />
        <line x1="270" y1="140" x2="270" y2="480" stroke="#3b4252" stroke-width="6" />
        <!-- Fechadura de ferro -->
        <rect x="280" y="300" width="18" height="30" rx="3" fill="#c5a059" stroke="#785926" stroke-width="2" />
        
        <!-- O cadáver caído do teto -->
        <ellipse cx="760" cy="490" rx="60" ry="22" fill="#1c2028" stroke="#2d3748" stroke-width="2" />
        <circle cx="715" cy="485" r="14" fill="#181a20" />

        <!-- Chave brilhante reluzindo no chão da cela -->
        <circle cx="810" cy="510" r="16" fill="#fef08a" opacity="0.3" class="pulse-key-glow" />
        <circle cx="810" cy="510" r="6" fill="#fef08a" />
      </svg>`;
  },

  /**
   * Helper para renderizar uma imagem ou seu fallback se falhar
   */
  createImageWithFallback(src, fallbackHtml, className = "") {
    const wrapper = document.createElement("div");
    wrapper.className = `asset-img-container ${className}`;

    const img = document.createElement("img");
    img.src = src;
    img.alt = "Dark Souls Asset";
    img.className = "asset-real-img";

    img.onload = () => {
      wrapper.innerHTML = "";
      wrapper.appendChild(img);
    };

    img.onerror = () => {
      wrapper.innerHTML = fallbackHtml;
    };

    // Inicialmente mostra o fallback gracioso enquanto carrega ou se não existir
    wrapper.innerHTML = fallbackHtml;
    return wrapper;
  }
};
