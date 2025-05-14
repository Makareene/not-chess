// === Фаза завершения ===

var curWinner = null;

// Инициализирует фазу завершения игры — блокирует все действия и отображает финальное сообщение
function startEndPhase() {
  currentPhase = 'end';
  selectedCell = null;
  validMoves = [];
  renderBoard(boardState);
  updateStatusMessage(t("game_over"), 'game_over');
}

// Обработка кликов отключается — игроки больше не могут взаимодействовать с доской
function handleEndClick(row, col) {
  // Не делает ничего — игра завершена
  return;
}

// Сброс всей игры и переход к фазе расстановки
function resetGame() {
  clearBoard();
  clearHighlights();
  selectedFigure = null;
  selectedCell = null;
  currentPlayer = 1;
  confirmedPlayers = 0;
  currentPhase = 'setup';
  gameEnded = false;
  resetInventory();
  renderInventory(inventory);
  board = createEmptyBoard();
  renderBoard(board);
  hideEndScreen();
  updateStatusMessage(t("begin_new_game", { currentPlayer: currentPlayer }), 'begin_new_game');
  updateCurrentPlayerDisplay(); // показываю какой игрок сейчас совершает действие
}

// Завершение игры с указанием победителя
function endGame(winner) {
  gameEnded = true;
  currentPhase = 'end';

  curWinner = winner;

  updateStatusMessage(t("game_ended", { curWinner: curWinner }), 'game_ended');
  let end_msg = $('#end-message');
  end_msg.text(t("end_message_won", { curWinner: curWinner }));
  end_msg.get(0).dataset.i18n = 'end_message_won';
  $('#end-screen').show();
}

// Проверка на ничью: остались только короли и, возможно, ловушки
function checkDrawCondition(board) {
  let kings = 0;
  let nonTrivialFigures = 0;

  for (let row of board) {
    for (let cell of row) {
      if (!cell) continue;
      if (cell.type === FIGURE_TYPES.KING) {
        kings++;
      } else if (cell.type !== FIGURE_TYPES.TRAP) {
        nonTrivialFigures++;
      }
    }
  }

  // Если два короля и больше никого (кроме ловушек) — ничья
  return kings === 2 && nonTrivialFigures === 0;
}

