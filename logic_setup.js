// logic_setup.js — логика фазы расстановки

var placedCount = null;
var expectedCount = null;
var figureTried = null;
var curRow = null;
var curCol = null;

// === Расстановка ===

// Подтверждает расстановку текущего игрока
function confirmPlacement() {
  if ( currentPhase != 'setup' ) return;
  placedCount = countFiguresOnBoard(currentPlayer);
  expectedCount = getTotalFigureCount();

  if (placedCount < expectedCount) {
    updateStatusMessage(t("not_all_placed", { placedCount: placedCount, expectedCount: expectedCount }), 'not_all_placed');
    return;
  }

  confirmedPlayers++;

  if (confirmedPlayers === 1) {
    currentPlayer = 2;
    resetInventory();
    renderInventory(inventory);
    updateStatusMessage(t("window_loaded", { currentPlayer: currentPlayer }), 'window_loaded');
    renderBoard(board);
  } else if (confirmedPlayers === 2) {
    currentPhase = 'battle';
    currentPlayer = 1;
    renderBoard(board);
    updateStatusMessage(t("battle_began", { currentPlayer: currentPlayer }), 'battle_began');
    updateCurrentPlayerDisplay();
  }
  updateCurrentPlayerDisplay();
}

// Автоматическая расстановка фигур игрока
function autoPlaceFigures() {
  if ( currentPhase != 'setup' ) return;

  const rows = currentPlayer === 1 ? [0, 1, 2] : [BOARD_SIZE - 1, BOARD_SIZE - 2, BOARD_SIZE - 3];
  clearBoard();

  const types = Object.keys(inventory);
  const shuffledCells = [];

  for (const row of rows) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      shuffledCells.push({ row, col });
    }
  }

  // Перемешиваем доступные клетки
  for (let i = shuffledCells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCells[i], shuffledCells[j]] = [shuffledCells[j], shuffledCells[i]];
  }

  let index = 0;
  for (const type of types) {
    let count = inventory[type];
    while (count > 0 && index < shuffledCells.length) {
      const { row, col } = shuffledCells[index++];
      board[row][col] = { type, owner: currentPlayer, visible: true };
      count--;
    }
    inventory[type] = 0; // все фигуры этого типа расставлены
  }

  renderBoard(board);
  renderInventory(inventory);
  updateStatusMessage(t("auto_placed"), 'auto_placed');
}

// Очистка доски от всех фигур (для текущего игрока)
function clearBoard() {
  if ( currentPhase != 'setup' ) return;
  
  const rows = currentPlayer === 1 ? [0, 1, 2] : [BOARD_SIZE - 1, BOARD_SIZE - 2, BOARD_SIZE - 3];
  for (const row of rows) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      board[row][col] = null;
    }
  }
  resetInventory();
  renderBoard(board);
  renderInventory(inventory);
  updateStatusMessage(t("board_cleaned"), 'board_cleaned');
}

// Создание начального инвентаря из константы INITIAL_FIGURE_COUNTS
function createInitialInventory() {
  const inventory = {};
  for (const [type, count] of Object.entries(INITIAL_FIGURE_COUNTS)) {
    inventory[type] = count;
  }
  return inventory;
}

// Логика выбора фигуры из инвентаря
function handleInventoryClick(element) {
  const type = element.getAttribute('data-figure');
  
  figureTried = FIGURE_SYMBOLS[type] || '?';

  // Если фигура недоступна — игнорируем
  if (!inventory[type] || inventory[type] <= 0) {
    updateStatusMessage(t("figure_tried", { figureTried: figureTried }), 'figure_tried');
    return;
  }

  selectedFigure = type;
  highlightInventorySelection(type); // визуальное выделение
  updateStatusMessage(t("figure_chose", { figureTried: figureTried }), 'figure_chose');
}
// Обработка клика по клетке доски в фазе расстановки
function handleCellClickSetupPhase(cellElement) {
  const row = parseInt(cellElement.dataset.row, 10);
  const col = parseInt(cellElement.dataset.col, 10);
  if (isNaN(row) || isNaN(col)) return;

  const figure = board[row][col];

  // Удалить свою фигуру, если она уже стоит
  if (figure && figure.owner === currentPlayer) {
    removeFigure(row, col);
    return;
  }

  if (!selectedFigure || inventory[selectedFigure] <= 0) {
    updateStatusMessage(t("figure_choose"), 'figure_choose');
    return;
  }

  if (board[row][col]) {
    updateStatusMessage(t("square_not_vacant"), 'square_not_vacant');
    return;
  }

  // Проверка допустимого ряда
  if ((currentPlayer === 1 && row >= 3) || (currentPlayer === 2 && row < BOARD_SIZE - 3)) {
    updateStatusMessage(t("placed_in_other_rows"), 'placed_in_other_rows');
    return;
  }

  // Размещение фигуры
  placeFigure(row, col, selectedFigure, currentPlayer);
  inventory[selectedFigure]--;
  updateInventoryCount(selectedFigure, inventory[selectedFigure]);
  renderBoard(board);
}

// Размещение фигуры на доске
function placeFigure(row, col, type, player) {
  board[row][col] = {
    type,
    owner: player,
    visible: true
  };
  figureTried = FIGURE_SYMBOLS[type] || '?';
  curRow = row;
  curCol = col;
  updateStatusMessage(t("was_placed_in", { figureTried: figureTried, curRow: curRow, curCol: curCol }), 'was_placed_in');
}

// Удаление фигуры с доски и возврат в инвентарь
function removeFigure(row, col) {
  const figure = board[row][col];
  if (figure && figure.owner === currentPlayer) {
    board[row][col] = null;
    inventory[figure.type]++;
    renderBoard(board);
    updateInventoryCount(figure.type, inventory[figure.type]);
    figureTried = FIGURE_SYMBOLS[figure.type] || '?';
    updateStatusMessage(t("returned_to_inventory", { figureTried: figureTried }), 'returned_to_inventory');
  }
}

function resetInventory() {
  inventory = createInitialInventory();
}

// Подсчёт количества фигур текущего игрока на доске
function countFiguresOnBoard(player) {
  let count = 0;
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = board[row][col];
      if (cell && cell.owner === player) {
        count++;
      }
    }
  }
  return count;
}

// Получить общее количество фигур, которое должен разместить игрок
function getTotalFigureCount() {
  return Object.values(INITIAL_FIGURE_COUNTS).reduce((sum, count) => sum + count, 0);
}
