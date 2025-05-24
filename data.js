// Типы фигур
const FIGURE_TYPES = {
  KING: 'king',
  WARRIOR: 'warrior',
  WIZARD: 'wizard',
  RANGER: 'ranger',
  ROGUE: 'Rogue',
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
  [FIGURE_TYPES.ROGUE]: '🔪',
  [FIGURE_TYPES.MONK]: '🙏',
  [FIGURE_TYPES.MIMIC]: '⚠️',
  [FIGURE_TYPES.TRAP]: '🕳️',
  [FIGURE_TYPES.DOMINANT]: '🔁'
};

// Наименования фигур
const FIGURE_NAMES = {
  'ru': {
    FIGURE_TYPES.KING]: 'Король',
    [FIGURE_TYPES.WARRIOR]: 'Воин',
    [FIGURE_TYPES.WIZARD]: 'Волшебник',
    [FIGURE_TYPES.RANGER]: 'Рейнджер',
    [FIGURE_TYPES.ROGUE]: 'Плут',
    [FIGURE_TYPES.MONK]: 'Монах',
    [FIGURE_TYPES.MIMIC]: 'Мимик',
    [FIGURE_TYPES.TRAP]: 'Ловушка',
    [FIGURE_TYPES.DOMINANT]: 'Доминант'
  },
  'en': {
    FIGURE_TYPES.KING]: 'King',
    [FIGURE_TYPES.WARRIOR]: 'Warrior',
    [FIGURE_TYPES.WIZARD]: 'Wizard',
    [FIGURE_TYPES.RANGER]: 'Ranger',
    [FIGURE_TYPES.ROGUE]: 'Rogue',
    [FIGURE_TYPES.MONK]: 'Monk',
    [FIGURE_TYPES.MIMIC]: 'Mimic',
    [FIGURE_TYPES.TRAP]: 'Trap',
    [FIGURE_TYPES.DOMINANT]: 'Dominant'
  }
};

// миниатюры фигур
const FIGURE_MINI1 = {
  [FIGURE_TYPES.KING]: '1_2_King.webp',
  [FIGURE_TYPES.WARRIOR]: '2_2_Warrior.webp',
  [FIGURE_TYPES.WIZARD]: '3_2_Wizard.webp',
  [FIGURE_TYPES.RANGER]: '4_2_Ranger.webp',
  [FIGURE_TYPES.ROGUE]: '5_2_Rogue.webp',
  [FIGURE_TYPES.MONK]: '6_2_Monk.webp',
  [FIGURE_TYPES.MIMIC]: '7_2_Mimic.webp',
  [FIGURE_TYPES.TRAP]: '8_2_Trap.webp',
  [FIGURE_TYPES.DOMINANT]: '9_2_Dominant.webp'
};

const FIGURE_MINI2 = {
  [FIGURE_TYPES.KING]: '1_2_King.webp',
  [FIGURE_TYPES.WARRIOR]: '2_2_Warrior.webp',
  [FIGURE_TYPES.WIZARD]: '3_2_Wizard.webp',
  [FIGURE_TYPES.RANGER]: '4_2_Ranger.webp',
  [FIGURE_TYPES.ROGUE]: '5_2_Rogue.webp',
  [FIGURE_TYPES.MONK]: '6_2_Monk.webp',
  [FIGURE_TYPES.MIMIC]: '7_2_Mimic.webp',
  [FIGURE_TYPES.TRAP]: '8_2_Trap.webp',
  [FIGURE_TYPES.DOMINANT]: '9_2_Dominant.webp'
};

// карточки фигур
const FIGURE_CARD1 = {
  [FIGURE_TYPES.KING]: '1_King.webp',
  [FIGURE_TYPES.WARRIOR]: '2_Warrior.webp',
  [FIGURE_TYPES.WIZARD]: '3_Wizard.webp',
  [FIGURE_TYPES.RANGER]: '4_Ranger.webp',
  [FIGURE_TYPES.ROGUE]: '5_Rogue.webp',
  [FIGURE_TYPES.MONK]: '6_Monk.webp',
  [FIGURE_TYPES.MIMIC]: '7_Mimic.webp',
  [FIGURE_TYPES.TRAP]: '8_Trap.webp',
  [FIGURE_TYPES.DOMINANT]: '9_Dominant.webp'
};

const FIGURE_CARD2 = {
  [FIGURE_TYPES.KING]: '1_King.webp',
  [FIGURE_TYPES.WARRIOR]: '2_Warrior.webp',
  [FIGURE_TYPES.WIZARD]: '3_Wizard.webp',
  [FIGURE_TYPES.RANGER]: '4_Ranger.webp',
  [FIGURE_TYPES.ROGUE]: '5_Rogue.webp',
  [FIGURE_TYPES.MONK]: '6_Monk.webp',
  [FIGURE_TYPES.MIMIC]: '7_Mimic.webp',
  [FIGURE_TYPES.TRAP]: '8_Trap.webp',
  [FIGURE_TYPES.DOMINANT]: '9_Dominant.webp'
};

// пути
const FIGURE_MINI1_PATH = 'Design/Cards/DOG';
const FIGURE_MINI2_PATH = 'Design/Cards/PEPE';

// Начальные количества фигур на игрока
const INITIAL_FIGURE_COUNTS = {
  [FIGURE_TYPES.KING]: 1,
  [FIGURE_TYPES.WARRIOR]: 4,
  [FIGURE_TYPES.WIZARD]: 4,
  [FIGURE_TYPES.RANGER]: 4,
  [FIGURE_TYPES.ROGUE]: 4,
  [FIGURE_TYPES.MONK]: 4,
  [FIGURE_TYPES.MIMIC]: 1,
  [FIGURE_TYPES.TRAP]: 1,
  [FIGURE_TYPES.DOMINANT]: 1
};

// Преимущества в бою
const BATTLE_RULES = {
  [FIGURE_TYPES.RANGER]:     [FIGURE_TYPES.ROGUE, FIGURE_TYPES.MONK],
  [FIGURE_TYPES.ROGUE]:      [FIGURE_TYPES.WARRIOR, FIGURE_TYPES.WIZARD],
  [FIGURE_TYPES.WIZARD]:     [FIGURE_TYPES.RANGER, FIGURE_TYPES.WARRIOR],
  [FIGURE_TYPES.MONK]:       [FIGURE_TYPES.WIZARD, FIGURE_TYPES.ROGUE],
  [FIGURE_TYPES.WARRIOR]:    [FIGURE_TYPES.RANGER, FIGURE_TYPES.MONK]
};

// Тип фигуры — обычная или особая
const FIGURE_CATEGORIES = {
  [FIGURE_TYPES.KING]: 'normal',
  [FIGURE_TYPES.WARRIOR]: 'normal',
  [FIGURE_TYPES.WIZARD]: 'normal',
  [FIGURE_TYPES.RANGER]: 'normal',
  [FIGURE_TYPES.ROGUE]: 'normal',
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
