type Connect4Chips = "🔴" | "🟡";
type Connect4EmptyCell = "  ";
type Connect4Cell = Connect4Chips | Connect4EmptyCell;
type Connect4State = "🔴" | "🟡" | "🔴 Won" | "🟡 Won" | "Draw";

type EmptyBoard = [
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
];

type NewGame = {
	board: EmptyBoard;
	state: "🟡";
};

type GameState = {
	board: Connect4Cell[][];
	state: Connect4State;
};

type PlaceTokenInRow<
	Row extends unknown[],
	Column extends number,
	State extends Connect4Chips,
	Index extends number = 0,
	Store extends unknown[] = [],
> = Row extends [infer First, ...infer Rest]
	? Column extends Index
		? [...Store, State, ...Rest]
		: PlaceTokenInRow<Rest, Column, State, [...Store, First]["length"], [...Store, First]>
	: Store;

type MakeMove<
	Board extends unknown[],
	State extends Connect4Chips,
	Column extends number,
	Store extends unknown[] = [],
> = Board extends [...infer Rest extends unknown[], infer Last extends unknown[]]
	? Last[Column] extends Connect4EmptyCell
		? [...Rest, PlaceTokenInRow<Last, Column, State>, ...Store]
		: MakeMove<Rest, State, Column, [Last, ...Store]>
	: Store;

type CheckRowForWin<
	Row extends Connect4Cell[],
	Chip extends Connect4Chips,
	Store extends unknown[] = [],
> = Store["length"] extends 4
	? true
	: Row extends [infer First, ...infer Rest extends Connect4Cell[]]
		? First extends Chip
			? CheckRowForWin<Rest, Chip, [...Store, First]>
			: CheckRowForWin<Rest, Chip>
		: false;

type GetColumn<
	Board extends Connect4Cell[][],
	Column extends number,
	Store extends unknown[] = [],
> = Board extends [infer First extends Connect4Cell[], ...infer Rest extends Connect4Cell[][]]
	? GetColumn<Rest, Column, [...Store, First[Column]]>
	: Store;

type GetRowIndex<Column extends unknown[], Store extends unknown[] = []> = Column extends [
	infer First,
	...infer Rest,
]
	? First extends Connect4Chips
		? Store["length"]
		: GetRowIndex<Rest, [...Store, First]>
	: -1;

type DiagonalMap = [
	[
		[[[0, 0], [1, 1], [2, 2], [3, 3]]],
		[[[0, 1], [1, 2], [2, 3], [3, 4]]],
		[[[0, 2], [1, 3], [2, 4], [3, 5]]],
		[[[0, 3], [1, 4], [2, 5], [3, 6]], [[0, 3], [1, 2], [2, 1], [3, 0]]],
		[[[0, 4], [1, 3], [2, 2], [3, 1]]],
		[[[0, 5], [1, 4], [2, 3], [3, 2]]],
		[[[0, 6], [1, 5], [2, 4], [3, 3]]],
	],
	[
		[[[1, 0], [2, 1], [3, 2], [4, 3]]],
		[[[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]]],
		[[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]], [[0, 3], [1, 2], [2, 1], [3, 0]]],
		[[[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]], [[0, 4], [1, 3], [2, 2], [3, 1], [4, 0]]],
		[[[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]], [[0, 3], [1, 4], [2, 5], [3, 6]]],
		[[[0, 6], [1, 5], [2, 4], [3, 3], [4, 2]]],
		[[[1, 6], [2, 5], [3, 4], [4, 3]]],
	],
	[
		[[[2, 0], [3, 1], [4, 2], [5, 3]]],
		[[[1, 0], [2, 1], [3, 2], [4, 3], [5, 4]], [[3, 0], [2, 1], [1, 2], [0, 3]]],
		[[[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]], [[0, 4], [1, 3], [2, 2], [3, 1], [4, 0]]],
		[
			[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
			[[0, 5], [1, 4], [2, 3], [3, 2], [4, 1], [5, 0]],
		],
		[[[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]], [[0, 6], [1, 5], [2, 4], [3, 3], [4, 2], [5, 1]]],
		[[[0, 3], [1, 4], [2, 5], [3, 6]], [[1, 6], [2, 5], [3, 4], [4, 3], [5, 2]]],
		[[[2, 6], [3, 5], [4, 4], [5, 3]]],
	],
	[
		[[[3, 0], [2, 1], [1, 2], [0, 3]]],
		[[[4, 0], [3, 1], [2, 2], [1, 3], [0, 4]], [[2, 0], [3, 1], [4, 2], [5, 3]]],
		[[[1, 0], [2, 1], [3, 2], [4, 3], [5, 4]], [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1], [5, 0]]],
		[
			[[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
			[[0, 6], [1, 5], [2, 4], [3, 3], [4, 2], [5, 1]],
		],
		[[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]], [[1, 6], [2, 5], [3, 4], [4, 3], [5, 2]]],
		[[[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]], [[2, 6], [3, 5], [4, 4], [5, 3]]],
		[[[3, 6], [2, 5], [1, 4], [0, 3]]],
	],
	[
		[[[4, 0], [3, 1], [2, 2], [1, 3]]],
		[[[5, 0], [4, 1], [3, 2], [2, 3], [1, 4]]],
		[[[5, 1], [4, 2], [3, 3], [2, 4], [1, 5]], [[5, 3], [4, 2], [3, 1], [2, 0]]],
		[[[5, 2], [4, 3], [3, 4], [2, 5], [1, 6]], [[5, 4], [4, 3], [3, 2], [2, 1], [1, 0]]],
		[[[5, 5], [4, 4], [3, 3], [2, 2], [1, 1]], [[5, 3], [4, 4], [3, 5], [2, 6]]],
		[[[5, 6], [4, 5], [3, 4], [2, 3], [1, 2]]],
		[[[4, 6], [3, 5], [2, 4], [1, 3]]],
	],
	[
		[[[5, 0], [4, 1], [3, 2], [2, 3]]],
		[[[5, 1], [4, 2], [3, 3], [2, 4]]],
		[[[5, 2], [4, 3], [3, 4], [2, 5]]],
		[[[5, 3], [4, 4], [3, 5], [2, 6]], [[5, 3], [4, 2], [3, 1], [2, 0]]],
		[[[5, 4], [4, 3], [3, 2], [2, 1]]],
		[[[5, 5], [4, 4], [3, 3], [2, 2]]],
		[[[5, 6], [4, 5], [3, 4], [2, 3]]],
	],
];

type CreateRowFromCoordsArray<
	Board extends Connect4Cell[][],
	Coords extends unknown[],
	Store extends unknown[] = [],
> = Coords extends [infer First extends number[], ...infer Rest]
	? CreateRowFromCoordsArray<Board, Rest, [...Store, Board[First[0]][First[1]]]>
	: Store;

type CheckDiagonalForWin<
	Board extends Connect4Cell[][],
	Chip extends Connect4Chips,
	Coords extends unknown[],
	Store extends unknown[] = [],
> = Coords extends [infer First extends unknown[], ...infer Rest]
	? CheckDiagonalForWin<
			Board,
			Chip,
			Rest,
			[...Store, CheckRowForWin<CreateRowFromCoordsArray<Board, First>, Chip>]
		>
	: true extends Store[number]
		? true
		: false;

type CheckIfArrayIsFull<Arr extends unknown[]> = Arr extends [
	infer First,
	...infer Rest extends unknown[],
]
	? First extends Connect4Chips
		? CheckIfArrayIsFull<Rest>
		: false
	: true;

type CheckForWin<
	Board extends Connect4Cell[][],
	Chip extends Connect4Chips,
	Column extends number,
> = true extends
	| CheckRowForWin<Board[GetRowIndex<GetColumn<Board, Column>>], Chip>
	| CheckRowForWin<GetColumn<Board, Column>, Chip>
	| CheckDiagonalForWin<Board, Chip, DiagonalMap[GetRowIndex<GetColumn<Board, Column>>][Column]>
	? Chip extends "🔴"
		? "🔴 Won"
		: "🟡 Won"
	: CheckIfArrayIsFull<Board[0]> extends true
		? "Draw"
		: Chip extends "🔴"
			? "🟡"
			: "🔴";

type Connect4<Game extends GameState, Move extends number> = Game["state"] extends Connect4Chips
	? {
			board: MakeMove<Game["board"], Game["state"], Move>;
			state: CheckForWin<MakeMove<Game["board"], Game["state"], Move>, Game["state"], Move>;
		}
	: Game;

// Tests

import { Expect, Equal } from "type-testing";

type test_move1_actual = Connect4<NewGame, 0>;
//   ^?
type test_move1_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
  ];
  state: "🔴";
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = Connect4<test_move1_actual, 0>;
//   ^?
type test_move2_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
  ];
  state: "🟡";
};
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = Connect4<test_move2_actual, 0>;
//   ^?
type test_move3_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
  ];
  state: "🔴";
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = Connect4<test_move3_actual, 1>;
//   ^?
type test_move4_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "  ", "  ", "  ", "  ", "  "],
  ];
  state: "🟡";
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_move5_actual = Connect4<test_move4_actual, 2>;
//   ^?
type test_move5_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "  ", "  ", "  ", "  "],
  ];
  state: "🔴";
};
type test_move5 = Expect<Equal<test_move5_actual, test_move5_expected>>;

type test_move6_actual = Connect4<test_move5_actual, 1>;
//   ^?
type test_move6_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "🔴", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "  ", "  ", "  ", "  "],
  ];
  state: "🟡";
};
type test_move6 = Expect<Equal<test_move6_actual, test_move6_expected>>;

type test_red_win_actual = Connect4<
  {
    board: [
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🔴', '🔴', '🔴', '  ', '  ', '  ', '  '],
      ['🟡', '🔴', '🟡', '🟡', '  ', '  ', '  ']
    ];
    state: '🔴';
  },
  3
>;

type test_red_win_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '🔴', '🔴', '🔴', '  ', '  ', '  '],
    ['🟡', '🔴', '🟡', '🟡', '  ', '  ', '  ']
  ];
  state: '🔴 Won';
};

type test_red_win = Expect<Equal<test_red_win_actual, test_red_win_expected>>;

type test_yellow_win_actual = Connect4<
  {
    board: [
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🔴', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🔴', '  ', '🔴', '🔴', '  ', '  ', '  '],
      ['🟡', '  ', '🟡', '🟡', '  ', '  ', '  ']
    ];
    state: '🟡';
  },
  1
>;

type test_yellow_win_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '  ', '🔴', '🔴', '  ', '  ', '  '],
    ['🟡', '🟡', '🟡', '🟡', '  ', '  ', '  ']
  ];
  state: '🟡 Won';
};

type test_yellow_win = Expect<
  Equal<test_yellow_win_actual, test_yellow_win_expected>
>;

type test_diagonal_yellow_win_actual = Connect4<
  {
    board: [
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '🟡', '🔴', '  ', '  ', '  '],
      ['🔴', '🟡', '🔴', '🔴', '  ', '  ', '  '],
      ['🟡', '🔴', '🟡', '🟡', '  ', '  ', '  ']
    ];
    state: '🟡';
  },
  3
>;

type test_diagonal_yellow_win_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '🟡', '  ', '  ', '  '],
    ['  ', '  ', '🟡', '🔴', '  ', '  ', '  '],
    ['🔴', '🟡', '🔴', '🔴', '  ', '  ', '  '],
    ['🟡', '🔴', '🟡', '🟡', '  ', '  ', '  ']
  ];
  state: '🟡 Won';
};

type test_diagonal_yellow_win = Expect<
  Equal<test_diagonal_yellow_win_actual, test_diagonal_yellow_win_expected>
>;

type test_draw_actual = Connect4<
  {
    board: [
      ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '  '],
      ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
      ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
      ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
      ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
      ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴']
    ];
    state: '🟡';
  },
  6
>;

type test_draw_expected = {
  board: [
    ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
    ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
    ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
    ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
    ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
    ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴']
  ];
  state: 'Draw';
};

type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;