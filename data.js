// Типы фигур
const FIGURE_TYPES = {
  KING: 'king',
  WARRIOR: 'warrior',
  WIZARD: 'wizard',
  RANGER: 'ranger',
  ROUGE: 'rouge',
  MONK: 'monk',
  MIMIC: 'mimic',
  TRAP: 'trap',
  DOMINANT: 'dominant'
};

// Символы фигур
const FIGURE_SYMBOLS = {
  [FIGURE_TYPES.KING]: '👑',
  [FIGURE_TYPES.WARRIOR]: '🛡',
  [FIGURE_TYPES.WIZARD]: '🧙',
  [FIGURE_TYPES.RANGER]: '🏹',
  [FIGURE_TYPES.ROUGE]: '🔪',
  [FIGURE_TYPES.MONK]: '🙏',
  [FIGURE_TYPES.MIMIC]: '⚠️',
  [FIGURE_TYPES.TRAP]: '🕳️',
  [FIGURE_TYPES.DOMINANT]: '🔁'
};

// Начальные количества фигур на игрока
const INITIAL_FIGURE_COUNTS = {
  [FIGURE_TYPES.KING]: 1,
  [FIGURE_TYPES.WARRIOR]: 4,
  [FIGURE_TYPES.WIZARD]: 4,
  [FIGURE_TYPES.RANGER]: 4,
  [FIGURE_TYPES.ROUGE]: 4,
  [FIGURE_TYPES.MONK]: 4,
  [FIGURE_TYPES.MIMIC]: 1,
  [FIGURE_TYPES.TRAP]: 1,
  [FIGURE_TYPES.DOMINANT]: 1
};

// Преимущества в бою
const BATTLE_RULES = {
  [FIGURE_TYPES.RANGER]:     [FIGURE_TYPES.ROUGE, FIGURE_TYPES.MONK],
  [FIGURE_TYPES.ROUGE]:      [FIGURE_TYPES.WARRIOR, FIGURE_TYPES.WIZARD],
  [FIGURE_TYPES.WIZARD]:     [FIGURE_TYPES.RANGER, FIGURE_TYPES.WARRIOR],
  [FIGURE_TYPES.MONK]:       [FIGURE_TYPES.WIZARD, FIGURE_TYPES.ROUGE],
  [FIGURE_TYPES.WARRIOR]:    [FIGURE_TYPES.RANGER, FIGURE_TYPES.MONK]
};

// Тип фигуры — обычная или особая
const FIGURE_CATEGORIES = {
  [FIGURE_TYPES.KING]: 'normal',
  [FIGURE_TYPES.WARRIOR]: 'normal',
  [FIGURE_TYPES.WIZARD]: 'normal',
  [FIGURE_TYPES.RANGER]: 'normal',
  [FIGURE_TYPES.ROUGE]: 'normal',
  [FIGURE_TYPES.MONK]: 'normal',
  [FIGURE_TYPES.MIMIC]: 'special',
  [FIGURE_TYPES.TRAP]: 'special',
  [FIGURE_TYPES.DOMINANT]: 'special'
};

// Эффекты особых фигур
const SPECIAL_EFFECTS = {
  [FIGURE_TYPES.MIMIC]: 'skip2turns',
  [FIGURE_TYPES.TRAP]: 'destroy',
  [FIGURE_TYPES.DOMINANT]: 'changeControl'
};

// Максимальное количество фигур на игрока
const MAX_FIGURES_PER_PLAYER = Object.values(INITIAL_FIGURE_COUNTS).reduce((sum, count) => sum + count, 0);
