// main.js — основной управляющий модуль Not Chess

// Выбранная игроком фигура для установки на поле (из инвентаря)
let selectedFigure = null;

// Координаты выбранной фигуры на доске во время фазы боя
let selectedCell = null;

// Номер текущего игрока (1 или 2)
var currentPlayer = 1;

// Объект инвентаря с доступными фигурами для текущего игрока
let inventory;

// Сколько игроков уже подтвердили расстановку (ожидаем 2)
let confirmedPlayers = 0;

// Двумерный массив доски, хранящий фигуры по координатам
let board;

// Текущая фаза игры: 'setup', 'battle' или 'end'
let currentPhase = 'setup';

// Флаг завершения игры
let gameEnded = false;


// Начальная инициализация
window.addEventListener('DOMContentLoaded', () => {
  board = createEmptyBoard(); // создаем пустую доску
  inventory = createInitialInventory(); // создаем инвентарь
  renderBoard(board); // отрисовываем доску с переданной переменной board
  renderInventory(inventory); // отображаем инвентарь
  updateStatusMessage(t("window_loaded", { currentPlayer: currentPlayer }), 'window_loaded');
  updateCurrentPlayerDisplay(); // показываю какой игрок сейчас совершает действие

  currentPhase = 'setup';

  // Обработчики кликов по клеткам доски
  document.getElementById('board').addEventListener('click', (e) => {
    if (!e.target.classList.contains('cell')) return;
    const cell = e.target;
    if (currentPhase === 'setup') {
      handleCellClickSetupPhase(cell);
    } else if (currentPhase === 'battle') {
      handleCellClickBattlePhase(cell);
    }
  });

  // Обработчики кликов по инвентарю
  document.getElementById('inventory').addEventListener('click', (e) => {
    if (!e.target.classList.contains('inventory-item')) return;
    handleInventoryClick(e.target);
  });

  // Кнопки управления
  document.getElementById('confirm-placement-button').addEventListener('click', confirmPlacement);
  document.getElementById('auto-place-button').addEventListener('click', autoPlaceFigures);
  document.getElementById('clear-board-button').addEventListener('click', clearBoard);
  document.getElementById('reset-button').addEventListener('click', resetGame);
  document.getElementById('start-new-game-button').addEventListener('click', resetGame);
});
