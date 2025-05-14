// ui.js

// Отображение игровой доски
function renderBoard(board) {
  const boardElement = $('#board');
  boardElement.empty();

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = $('<div></div>').addClass('cell')
        .attr('data-row', row)
        .attr('data-col', col);

      const figure = board[row][col];
      if (figure) {
        const isVisible = figure.owner === currentPlayer || figure.revealed;
        const symbol = isVisible ? (FIGURE_SYMBOLS[figure.type] || '?') : HIDDEN_SYMBOL;
        cell.text(symbol);
        if (figure.owner === 1) cell.addClass('player1');
        else if (figure.owner === 2) cell.addClass('player2');
        if (figure.hidden) cell.addClass('hidden');
      }

      boardElement.append(cell);
    }
  }
}

// Отображение инвентаря доступных фигур
function renderInventory(inventory) {
  const inventoryElement = $('#inventory');
  inventoryElement.empty();

  for (const [type, count] of Object.entries(inventory)) {
    const item = $('<div></div>').addClass('inventory-item')
      .attr('data-figure', type)
      .text(`${FIGURE_SYMBOLS[type] || '?'} x${count}`);
    inventoryElement.append(item);
  }
}

// Подсветка выбранной клетки
function highlightCell(row, col) {
  $('.cell').removeClass('highlight');
  $(`.cell[data-row=${row}][data-col=${col}]`).addClass('highlight');
}

// Обновление счётчика фигур в инвентаре
function updateInventoryCount(type, count) {
  $(`.inventory-item[data-figure=${type}]`).text(`${FIGURE_SYMBOLS[type] || '?'} x${count}`);
}

// Отображение статусного сообщения
function updateStatusMessage(message, data_i18n) {
  let status = $('#status');
  if( data_i18n !== 'undefined' ) status.get(0).dataset.i18n = data_i18n;
  status.text(message).hide().fadeIn(300);
}

// Подсветка доступных ходов и атак
function highlightAvailableMoves(moves) {
  $('.cell').removeClass('available-move available-attack');
  for (const move of moves) {
    const selector = `.cell[data-row=${move.row}][data-col=${move.col}]`;
    if (move.type === 'move') {
      $(selector).addClass('available-move');
    } else if (move.type === 'attack') {
      $(selector).addClass('available-attack');
    }
  }
}

// Очистка подсветки доступных ходов
function clearHighlights() {
  $('.cell').removeClass('highlight available-move available-attack');
}

// Обновление текста на кнопке подтверждения
function updateConfirmButton(text) {
  $('#confirmBtn').fadeOut(150, function () {
    $(this).text(text).fadeIn(150);
  });
}

// Отключение взаимодействия с доской
function disableBoardInteraction() {
  $('#board').addClass('disabled');
  $('.cell').css('pointer-events', 'none').css('opacity', '0.6');
}

// Включение взаимодействия с доской
function enableBoardInteraction() {
  $('#board').removeClass('disabled');
  $('.cell').css('pointer-events', '').css('opacity', '');
}

// Визуальное выделение выбранной фигуры в инвентаре
function highlightInventorySelection(type) {
  $('.inventory-item').removeClass('selected');
  $(`.inventory-item[data-figure="${type}"]`).addClass('selected');
}

// Скрыть экран окончания игры
function hideEndScreen() {
  $('#end-screen').hide();
}

// Вспомогательная функция для создания пустой доски
function createEmptyBoard() {
  const board = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const newRow = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      newRow.push(null);
    }
    board.push(newRow);
  }
  return board;
}

function updateCurrentPlayerDisplay() {
  const display = document.getElementById('current-player-display');
  display.dataset.i18n = 'player_moves';
  display.textContent = t("player_moves", { currentPlayer: currentPlayer });
}
