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
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "]
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
  Store extends unknown[] = []
> = Row extends [infer First, ...infer Rest]
  ? Column extends Index
    ? [...Store, State, ...Rest]
    : PlaceTokenInRow<
        Rest,
        Column,
        State,
        [...Store, First]["length"],
        [...Store, First]
      >
  : Store;

type TestPlaceTokenInRow = PlaceTokenInRow<
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  0,
  "🟡"
>;

type MakeMove<
  Board extends unknown[],
  State extends Connect4Chips,
  Column extends number,
  Store extends unknown[] = []
> = Board extends [
  ...infer Rest extends unknown[],
  infer Last extends unknown[]
]
  ? Last[Column] extends Connect4EmptyCell
    ? [...Rest, PlaceTokenInRow<Last, Column, State>, ...Store]
    : MakeMove<Rest, State, Column, [Last, ...Store]>
  : Store;

type TestMakeMove = MakeMove<
  [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "]
  ],
  "🔴",
  0
>;

type CheckForWin = unknown;

type Connect4<Game extends GameState, Move extends number> = unknown;
