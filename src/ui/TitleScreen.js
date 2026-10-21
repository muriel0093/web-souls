import { gameState } from '../core/GameState.js';
import { soundManager } from '../core/SoundManager.js';

export function renderTitleScreen() {
  const container = document.createElement('div');
  container.className = 'screen title-screen';

  container.innerHTML = `
    <div class="title-bg-overlay"></div>
    <canvas id="embers-canvas" class="embers-canvas"></canvas>

    <div class="title-content">
      <div class="logo-container">
        <div class="extracted-game-logo">
          <img src="/assets/ui/dark_souls_logo.png" alt="Dark Souls Official Logo" class="official-souls-logo" />
        </div>
        <h1 class="main-title">WEB SOULS</h1>
        <div class="title-divider"></div>
        <p class="subtitle">REMASTERED CHRONICLES</p>
      </div>

      <div class="start-prompt" id="btn-start">
        <span class="prompt-arrow">◈</span>
        <span class="prompt-text">CLIQUE PARA INICIAR</span>
        <span class="prompt-arrow">◈</span>
      </div>

      <div class="title-footer">
        <p>© Bandai Namco Entertainment Inc. / FromSoftware, Inc. Web Souls é um projeto tributo e protótipo point & click para navegadores.</p>
        <p class="version-tag">Versão 0.1.0 • Pressione F11 para Tela Cheia</p>
      </div>
    </div>
  `;

  // Inicializa partículas de cinzas/brasa sutis
  setTimeout(() => {
    initEmbersCanvas(container.querySelector('#embers-canvas'));
  }, 50);

  // Gatilho de início por clique ou teclado
  const handleStart = () => {
    soundManager.playMenuSelect();
    gameState.setScreen('menu');
  };

  container.addEventListener('click', handleStart);

  const handleKeyDown = () => {
    handleStart();
    window.removeEventListener('keydown', handleKeyDown);
  };
  window.addEventListener('keydown', handleKeyDown, { once: true });

  return container;
}

/**
 * Criação de partículas flutuantes de brasas/fumaça de Dark Souls
 */
function initEmbersCanvas(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animationFrame;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2.5 + 0.5,
    speedY: -(Math.random() * 0.8 + 0.3),
    speedX: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.7 + 0.2,
    hue: Math.random() > 0.3 ? 35 : 15 // Brasas douradas e alaranjadas
  }));

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y < 0) {
        p.y = canvas.height;
        p.x = Math.random() * canvas.width;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, 0.8)`;
      ctx.fill();
    });

    animationFrame = requestAnimationFrame(draw);
  };

  draw();
}
