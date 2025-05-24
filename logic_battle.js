// === Фаза битвы ===

var disabledTurnsCnt = 2; // кол-во пропуска ходов игрока
var curCellType = null;
var disabledTurns = null;
var figureAttacker = null;
var figureDefender = null;

// Обработка клика по клетке в боевой фазе
function handleCellClickBattlePhase(cellElement) {
  if (gameEnded) return;

  const row = parseInt(cellElement.dataset.row);
  const col = parseInt(cellElement.dataset.col);
  const cell = board[row][col];

  // Клик на свою фигуру — выбор
  if (cell && cell.owner === currentPlayer) {
    if (!isSelectable(cell)) {
      updateStatusMessage(t("cant_choose_trap"), 'cant_choose_trap');
      return;
    }
    
    figureTried = FIGURE_NAMES[currentLang][cell.type];

    if (cell && cell.disabledTurns && cell.disabledTurns > 0) {
      disabledTurns = cell.disabledTurns;
      updateStatusMessage(t("disabled_turns", { figureTried: figureTried, disabledTurns: disabledTurns }), 'disabled_turns');
      return;
    }
    
    selectedCell = { row, col };
    highlightCell(row, col);
    updateStatusMessage(t("figure_chose", { figureTried: figureTried }), 'figure_chose');
    return;
  }

  // Клик на пустую или вражескую клетку — попытка хода
  if (selectedCell) {
    const fromCell = board[selectedCell.row][selectedCell.col];
    const toCell = board[row][col];

    // Исключение: особые фигуры не могут ходить на союзные и вражеские фигуры
    if (FIGURE_CATEGORIES[fromCell.type] === 'special' && toCell !== null) {
      updateStatusMessage(t("especial_figures"), 'especial_figures');
      return;
    }

    attemptMove(selectedCell.row, selectedCell.col, row, col);
    selectedCell = null;
    clearHighlights();

    if (checkDrawCondition(board)) {
      updateStatusMessage(t("draw_kings"), 'draw_kings');
      gameEnded = true;
      currentPhase = 'end';
      let end_msg = $('#end-message');
      end_msg.text(t("draw_kings"));
      end_msg.get(0).dataset.i18n = "draw_kings";
      $('#end-screen').show();
      return;
    }
    
  }
}

// Попытка сделать ход с клетки (fromRow, fromCol) на (toRow, toCol)
function attemptMove(fromRow, fromCol, toRow, toCol) {
  const attacker = board[fromRow][fromCol];
  const defender = board[toRow][toCol];

  const dx = Math.abs(toCol - fromCol);
  const dy = Math.abs(toRow - fromRow);
  if (dx > 1 || dy > 1) {
    updateStatusMessage(t("only_neighboring_cell"), 'only_neighboring_cell');
    return;
  }

  if (defender && defender.owner === currentPlayer) {
    updateStatusMessage(t("not_own_piece"), 'not_own_piece');
    return;
  }
  
  figureAttacker = FIGURE_NAMES[currentLang][attacker.type];

  // Обработка особых фигур
  if (defender) {
    const defType = defender.type;
    figureDefender = FIGURE_NAMES[currentLang][defender.type];

    attacker.revealed = defender.revealed = true; // раскрываю обе фигуры, т.к. одна наступает на другую

    if (defType === FIGURE_TYPES.DOMINANT) {
      board[toRow][toCol] = { ...attacker, owner: 3 - currentPlayer };
      board[fromRow][fromCol] = null;
      if (attacker.type === FIGURE_TYPES.KING) {
        renderBoard(board);
        endGame(3 - currentPlayer); // Победа соперника
        return;
      }
      
      updateStatusMessage(t("attacker_dominanted", { figureAttacker: figureAttacker }), 'attacker_dominanted');
      currentPlayer = 3 - currentPlayer;
      renderBoard(board);
      updateCurrentPlayerDisplay();
      return;
    }

    if (defType === FIGURE_TYPES.MIMIC) {
      board[toRow][toCol] = { ...attacker, owner: currentPlayer, disabledTurns: disabledTurnsCnt };
      board[fromRow][fromCol] = null;
      updateStatusMessage(t("attacker_mimiced", { figureAttacker: figureAttacker, disabledTurnsCnt: disabledTurnsCnt }), 'attacker_mimiced');
      currentPlayer = 3 - currentPlayer;
      renderBoard(board);
      updateCurrentPlayerDisplay();
      return;
    }

    // Стандартная боевая система
    const result = resolveCombat(attacker, defender);
    if (result === 'attacker') {
      board[toRow][toCol] = attacker;
      if ( currentPhase != 'end' ) updateStatusMessage(t("attacker_won", { figureAttacker: figureAttacker, figureDefender: figureDefender }), 'attacker_won');
    } else if (result === 'defender') {
      if ( currentPhase != 'end' ) updateStatusMessage(t("attacker_lost", { figureAttacker: figureAttacker, figureDefender: figureDefender }), 'attacker_lost');
    } else {
      board[toRow][toCol] = null;
      if ( currentPhase != 'end' ) updateStatusMessage(t("attacker_draw", { figureAttacker: figureAttacker, figureDefender: figureDefender }), 'attacker_draw');
    }

    board[fromRow][fromCol] = null;
  } else {
    // Ход на пустую клетку
    board[toRow][toCol] = attacker;
    board[fromRow][fromCol] = null;
    updateStatusMessage(t("attacker_moved", { figureAttacker: figureAttacker }), 'attacker_moved');
  }

  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const fig = board[r][c];
      if (fig && fig.owner === currentPlayer && fig.disabledTurns && fig.disabledTurns > 0) {
        fig.disabledTurns--;
      }
    }
  }

  currentPlayer = 3 - currentPlayer;
  renderBoard(board);
  updateCurrentPlayerDisplay();
}

// Определение исхода боя между двумя фигурами
function resolveCombat(attacker, defender) {
  if (defender.type === FIGURE_TYPES.KING) {
    endGame(currentPlayer); // Победа атакующего короля
    return 'attacker';
  }
  if (attacker.type === FIGURE_TYPES.KING) return 'attacker';

  const winsAgainst = BATTLE_RULES[attacker.type] || [];
  const losesTo = BATTLE_RULES[defender.type] || [];

  if (winsAgainst.includes(defender.type)) return 'attacker';
  if (losesTo.includes(attacker.type)) return 'defender';

  return 'draw';
}

// Проверка: можно ли выбрать фигуру
function isSelectable(cell) {
  return !(cell && cell.type === FIGURE_TYPES.TRAP);
}
