type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type MapY = { top: 0; middle: 1; bottom: 2 };
type TicTacToeXPositions = "left" | "center" | "right";
type MapX = { left: 0; center: 1; right: 2 };
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTacToePositionsMap = {
  [Key in TicTacToePositions]: Key extends `${infer Y extends TicTacToeYPositions}-${infer X extends TicTacToeXPositions}`
    ? [MapY[Y], MapX[X]]
    : never;
};
type TicTacToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTacToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

type NewGame = {
  board: EmptyBoard;
  state: "❌";
};

type GetEndState<WinningChip extends TicTacToeChip> = WinningChip extends "❌"
  ? "❌ Won"
  : "⭕ Won";

type PlaceChipInColumn<
  Row extends unknown[],
  Column extends number,
  Chip extends TicTacToeChip,
  Index extends number = 0,
  Store extends unknown[] = []
> = Row extends [infer First, ...infer Rest]
  ? Index extends Column
    ? [...Store, Chip, ...Rest]
    : PlaceChipInColumn<
        [...Rest],
        Column,
        Chip,
        [...Store, unknown]["length"],
        [...Store, First]
      >
  : Store;

type PlaceChipInRow<
  Board extends TicTacToeBoard,
  Row extends number,
  Column extends number,
  Chip extends TicTacToeChip,
  Index extends number = 0,
  Store extends unknown[] = []
> = Board extends [
  infer First extends unknown[],
  ...infer Rest extends TicTacToeCell[][]
]
  ? Index extends Row
    ? [...Store, PlaceChipInColumn<First, Column, Chip>, ...Rest]
    : PlaceChipInRow<
        [...Rest],
        Row,
        Column,
        Chip,
        [...Store, unknown]["length"],
        [...Store, First]
      >
  : Store;

type CheckRowForWinner<
  Board extends unknown[],
  Turn extends TicTacToeChip,
  Store extends unknown[] = []
> = Board extends [infer First, ...infer Rest]
  ? First extends Turn
    ? CheckRowForWinner<[...Rest], Turn, [...Store, First]>
    : never
  : GetEndState<Turn>;

type CheckColumnForWinner<
  Board extends unknown[],
  Turn extends TicTacToeChip,
  Column extends number,
  Store extends unknown[] = []
> = Board extends [infer First extends unknown[], ...infer Rest]
  ? First[Column] extends Turn
    ? CheckColumnForWinner<[...Rest], Turn, Column, [...Store, First]>
    : never
  : GetEndState<Turn>;

type TopLeftDiagnol = [0, 1, 2];
type TopRightDiagnol = [2, 1, 0];
type ValidDiagnolCheck = [0 | 2, 1, 0 | 2];

type CheckTopLeftDiagnol<
  Board extends TicTacToeBoard,
  Turn extends TicTacToeChip,
  Row extends number = 0,
  Column extends number = 0,
  Store extends unknown[] = []
> = Board[Row][Column] extends Turn
  ? CheckTopLeftDiagnol<
      Board,
      Turn,
      [...Store, unknown]["length"],
      TopLeftDiagnol[[...Store, unknown]["length"]],
      [...Store, Turn]
    >
  : Store["length"] extends 3
  ? GetEndState<Turn>
  : never;

type CheckTopRightDiagnol<
  Board extends TicTacToeBoard,
  Turn extends TicTacToeChip,
  Row extends number = 0,
  Column extends number = 2,
  Store extends unknown[] = []
> = Board[Row][Column] extends Turn
  ? CheckTopRightDiagnol<
      Board,
      Turn,
      [...Store, unknown]["length"],
      TopRightDiagnol[[...Store, unknown]["length"]],
      [...Store, Turn]
    >
  : Store["length"] extends 3
  ? GetEndState<Turn>
  : never;

type CheckDiagnolForWinner<
  Board extends TicTacToeBoard,
  Turn extends TicTacToeChip
> = CheckTopLeftDiagnol<Board, Turn> | CheckTopRightDiagnol<Board, Turn>;

type CheckDraw<Board extends TicTacToeBoard> =
  TicTacToeEmptyCell extends Board[number][number] ? never : "Draw";

type CheckForWinner<
  Board extends TicTacToeBoard,
  Turn extends TicTacToeChip,
  Row extends number,
  Column extends number
> = Row extends ValidDiagnolCheck[Column]
  ?
      | CheckDiagnolForWinner<Board, Turn>
      | CheckRowForWinner<Board[Row], Turn>
      | CheckColumnForWinner<Board, Turn, Column>
  :
      | CheckRowForWinner<Board[Row], Turn>
      | CheckColumnForWinner<Board, Turn, Column>;

type MakeMove<
  Board extends TicTacToeBoard,
  Chip extends TicTacToeChip,
  Row extends number,
  Column extends number
> = {
  board: PlaceChipInRow<Board, Row, Column, Chip>;
  state: CheckForWinner<
    PlaceChipInRow<Board, Row, Column, Chip>,
    Chip,
    Row,
    Column
  > extends never
    ? CheckDraw<PlaceChipInRow<Board, Row, Column, Chip>> extends never
      ? Exclude<TicTacToeChip, Chip>
      : CheckDraw<PlaceChipInRow<Board, Row, Column, Chip>>
    : CheckForWinner<
        PlaceChipInRow<Board, Row, Column, Chip>,
        Chip,
        Row,
        Column
      >;
};

type IsMoveValid<
  Board extends TicTacToeBoard,
  Row extends number,
  Column extends number
> = Board[Row][Column] extends TicTacToeEmptyCell ? true : false;

type TicTacToe<
  Game extends TicTacToeGame,
  NextMove extends TicTacToePositions
> = TicTacToePositionsMap[NextMove] extends [
  infer Row extends number,
  infer Column extends number
]
  ? IsMoveValid<Game["board"], Row, Column> extends true
    ? Game["state"] extends TicTacToeChip
      ? MakeMove<Game["board"], Game["state"], Row, Column>
      : Game
    : Game
  : Game;

// Tests

import { Equal, Expect } from "type-testing";

type test_move1_actual = TicTacToe<NewGame, "top-center">;
//   ^?
type test_move1_expected = {
  board: [["  ", "❌", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];
  state: "⭕";
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = TicTacToe<test_move1_actual, "top-left">;
//   ^?
type test_move2_expected = {
  board: [["⭕", "❌", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];
  state: "❌";
};
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = TicTacToe<test_move2_actual, "middle-center">;
//   ^?
type test_move3_expected = {
  board: [["⭕", "❌", "  "], ["  ", "❌", "  "], ["  ", "  ", "  "]];
  state: "⭕";
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = TicTacToe<test_move3_actual, "bottom-left">;
//   ^?
type test_move4_expected = {
  board: [["⭕", "❌", "  "], ["  ", "❌", "  "], ["⭕", "  ", "  "]];
  state: "❌";
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_x_win_actual = TicTacToe<test_move4_actual, "bottom-center">;
//   ^?
type test_x_win_expected = {
  board: [["⭕", "❌", "  "], ["  ", "❌", "  "], ["⭕", "❌", "  "]];
  state: "❌ Won";
};
type test_x_win = Expect<Equal<test_x_win_actual, test_x_win_expected>>;

type type_move5_actual = TicTacToe<test_move4_actual, "bottom-right">;
//   ^?
type type_move5_expected = {
  board: [["⭕", "❌", "  "], ["  ", "❌", "  "], ["⭕", "  ", "❌"]];
  state: "⭕";
};
type test_move5 = Expect<Equal<type_move5_actual, type_move5_expected>>;

type test_o_win_actual = TicTacToe<type_move5_actual, "middle-left">;
//   ^?
type test_o_win_expected = {
  board: [["⭕", "❌", "  "], ["⭕", "❌", "  "], ["⭕", "  ", "❌"]];
  state: "⭕ Won";
};

// invalid move don't change the board and state
type test_invalid_actual = TicTacToe<test_move1_actual, "top-center">;
//   ^?
type test_invalid_expected = {
  board: [["  ", "❌", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];
  state: "⭕";
};
type test_invalid = Expect<Equal<test_invalid_actual, test_invalid_expected>>;

type test_before_draw = {
  board: [["⭕", "❌", "⭕"], ["⭕", "❌", "❌"], ["❌", "⭕", "  "]];
  state: "⭕";
};
type test_draw_actual = TicTacToe<test_before_draw, "bottom-right">;
//   ^?
type test_draw_expected = {
  board: [["⭕", "❌", "⭕"], ["⭕", "❌", "❌"], ["❌", "⭕", "⭕"]];
  state: "Draw";
};
type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;
