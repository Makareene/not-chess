// lang.js — мультиязычность интерфейса и сообщений

let currentLang = 'ru';

const LANGUAGES = {
	ru: {
		title: "Not Chess v0.1",
		link_docs: "📄 Техзадание",
		link_plan: "🗂️ План реализации",
		current_player: "Сейчас ходит игрок 1",
		button_confirm: "Подтвердить расстановку",
		button_auto: "Авторасстановка",
		button_clear: "Очистить доску",
		button_reset: "Сброс игры",
		just_start: "Статус: ждём начала",
		end_message: "Игра окончена",
		start_new_game: "Начать заново",
		player_moves: "Сейчас ходит игрок {currentPlayer}",
		window_loaded: "Игрок {currentPlayer}, расставьте свои фигуры.",
		not_all_placed: "Вы расставили {placedCount} из {expectedCount} фигур. Завершите расстановку.",
		battle_began: "Фаза боя началась. Ходит игрок {currentPlayer}.",
		auto_placed: "Фигуры расставлены автоматически.",
		board_cleaned: "Доска очищена.",
		figure_tried: "Фигура {figureTried} недоступна.",
		figure_chose: "Вы выбрали: {figureTried}.",
		figure_choose: "Выберите фигуру из инвентаря.",
		square_not_vacant: "Клетка занята.",
		placed_in_other_rows: "Можно размещать фигуры только на своих рядах.",
		was_placed_in: "{figureTried} размещен(а) в ячейке ({curRow}, {curCol}).",
		returned_to_inventory: "{figureTried} возвращен(а) в инвентарь.",
		game_over: 'Игра завершена. Нажмите кнопку "Начать заново", чтобы сыграть ещё раз.',
		begin_new_game: "Начинаем новую игру. Игрок {currentPlayer}, расставьте свои фигуры.",
		game_ended: "Игра окончена. Победил игрок {curWinner}.",
		end_message_won: "Победил игрок {curWinner}!",
		cant_choose_trap: "Ловушка не может ходить!",
		disabled_turns: "{figureTried} обездвижен и не может ходить (ещё {disabledTurns} ход(а)).",
		especial_figures: "Особые фигуры не могут атаковать.",
		draw_kings: "Ничья! Остались только короли.",
		only_neighboring_cell: "Можно ходить только на соседнюю клетку.",
		not_own_piece: "Нельзя ходить на свою фигуру.",
		attacker_dominanted: "{figureAttacker} столкнулся(ась) с Доминантом и теперь принадлежит противнику!",
		attacker_mimiced: "{figureAttacker} столкнулся(ась) с Мимиком и пропускает {disabledTurnsCnt} ход(а).",
		attacker_won: "{figureAttacker} победил {figureDefender}.",
		attacker_lost: "{figureAttacker} проиграл {figureDefender}.",
		attacker_draw: "{figureAttacker} и {figureDefender} уничтожены.",
		attacker_moved: "{figureAttacker} сделал ход."
	},
	en: {
		title: "Not Chess v0.1",
    link_docs: "📄 Terms of reference",
    link_plan: "🗂️ Implementation plan",
    current_player: "Player 1 is currently moving",
    button_confirm: "Confirm",
    button_auto: "Auto-arrange",
    button_clear: "Clean",
    button_reset: "Reset",
    just_start: "Status: waiting for the start",
    end_message: "Game over",
    start_new_game: "Play again",
    player_moves: "Now is player {currentPlayer} turn",
		window_loaded: "Player {currentPlayer}, arrange your pieces.",
		not_all_placed: "You placed {placedCount} out of {expectedCount} pieces. Complete the arrangement.",
		battle_began: "Game begins. Player {currentPlayer} turn.",
		auto_placed: "The pieces were auto-arranged.",
		board_cleaned: "The board was cleaned.",
		figure_tried: "The piece {figureTried} is unavailable.",
		figure_chose: "You chose: {figureTried}.",
		figure_choose: "Choose a piece from your inventory.",
		square_not_vacant: "This square is not vacant.",
		placed_in_other_rows: "The pieces can't be placed in other player's rows.",
		was_placed_in: "{figureTried} was placed in ({curRow}, {curCol}).",
		returned_to_inventory: "{figureTried} was returned to your inventory.",
		game_over: 'Game over. Press "Start a new game", to play again.',
		begin_new_game: "Starting a new game. Player {currentPlayer}, arrange your pieces.",
		game_ended: "Game over. Player {curWinner} wins.",
		end_message_won: "Player {curWinner} wins!",
		cant_choose_trap: "The Trap can't move!",
		disabled_turns: "{figureTried} won't move for ({disabledTurns} turn(s)).",
		especial_figures: "Special pieces can't attack.",
		draw_kings: "A draw! Only Kings remain.",
		only_neighboring_cell: "Pieces can move only to squares next to them.",
		not_own_piece: "Can't attack your own piece.",
		attacker_dominanted: "{figureAttacker} attacked the Dominant and is now under it's control!",
		attacker_mimiced: "{figureAttacker} attacked the Mimic and won't move for {disabledTurnsCnt} turn(s).",
		attacker_won: "{figureAttacker} defeated {figureDefender}.",
		attacker_lost: "{figureAttacker} lost to {figureDefender}.",
		attacker_draw: "{figureAttacker} and {figureDefender} are destroyed.",
		attacker_moved: "{figureAttacker} made their turn."
	}
};

function t(key, vars = {}) {
	let msg = LANGUAGES[currentLang][key] || key;
	for (const [k, v] of Object.entries(vars)) {
		const regex = new RegExp('{'+ k +'}', 'g'); // ← Поддержка повторений
		msg = msg.replace(regex, v);
	}
	return msg;
}

function updateInterfaceLanguage() {
	$('[data-i18n]').each(function () {
		const key = $(this).attr('data-i18n');
		const translated = LANGUAGES[currentLang][key];
		if (translated) {
			// Автозамена глобальных переменных в {var}
			let finalText = translated;
			finalText = finalText.replace(/{(\w+)}/g, (_, name) => {
				return typeof window[name] !== 'undefined' ? (['figureTried', 'figureAttacker', 'figureDefender'].includes(name)? FIGURE_NAMES[currentLang][figureTried]: window[name]) : `{${name}}`;
			});
      
      if ( $(this.parentNode).is('#controls') ) {
        $(this).attr('title', finalText);
      } else {
        $(this).text(finalText);
      }
		}
		
		let doc_link = null;
		if ( key == 'link_docs' ) {
			doc_link = 'docs';
		} else if( key == 'link_plan' ) {
			doc_link = 'plan';
		}

		if ( doc_link ) {
			$(this).attr('href', doc_link + ( currentLang != 'ru'? '_'+ currentLang: '' ) +'.html');
		}

	});
}

$('#language-select').on('change', function () {
	currentLang = this.value;
	updateInterfaceLanguage();
});
