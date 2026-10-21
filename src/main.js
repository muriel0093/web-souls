import './style.css';
import { gameState } from './core/GameState.js';
import { renderTitleScreen } from './ui/TitleScreen.js';
import { renderMainMenu } from './ui/MainMenu.js';
import { renderCharacterSelect } from './ui/CharacterSelect.js';
import { renderGameView } from './ui/GameView.js';

const app = document.querySelector('#app');

function renderApp() {
  if (!app) return;
  app.innerHTML = '';

  let screenElement;
  switch (gameState.currentScreen) {
    case 'title':
      screenElement = renderTitleScreen();
      break;
    case 'menu':
      screenElement = renderMainMenu();
      break;
    case 'character_select':
      screenElement = renderCharacterSelect();
      break;
    case 'game':
      screenElement = renderGameView();
      break;
    default:
      screenElement = renderTitleScreen();
  }

  app.appendChild(screenElement);
}

// Inicia com a tela de título
gameState.subscribe(() => {
  renderApp();
});

renderApp();
