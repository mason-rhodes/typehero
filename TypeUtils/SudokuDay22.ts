/** because "dashing" implies speed */
type Dasher = "💨";

/** representing dancing or grace */
type Dancer = "💃";

/** a deer, prancing */
type Prancer = "🦌";

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = "🌟";

/** for the celestial body that shares its name */
type Comet = "☄️";

/** symbolizing love, as Cupid is the god of love */
type Cupid = "❤️";

/** representing thunder, as "Donner" means thunder in German */
type Donner = "🌩️";

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = "⚡";

/** for his famous red nose */
type Rudolph = "🔴";

type Reindeer =
  | Dasher
  | Dancer
  | Prancer
  | Vixen
  | Comet
  | Cupid
  | Donner
  | Blitzen
  | Rudolph;

type ValidateRows<Rows extends unknown[]> = Rows extends [
  infer First extends unknown[],
  ...infer Rest
]
  ? Reindeer extends First[number]
    ? ValidateRows<Rest>
    : false
  : true;

type CombineRows<
  Row extends unknown[],
  Store extends unknown[] = []
> = Row extends [infer FirstArray extends unknown[], ...infer Rest]
  ? CombineRows<Rest, [...Store, ...FirstArray]>
  : Store;

type GetRows<
  Grid extends unknown[],
  Store extends unknown[] = []
> = Grid extends [infer FirstRow extends unknown[], ...infer Rest]
  ? GetRows<Rest, [...Store, CombineRows<FirstRow>]>
  : Store;

// Pass Grid through GetRows before passing it to ValidateColumns
// type ValidateColumns<
// 	Grid extends unknown[][],
// 	Index extends number = 0,
// 	Store extends unknown[] = [],
// > = Grid[number]["length"] extends Index
// 	? true
// 	: Reindeer extends Grid[number][Index]
// 		? ValidateColumns<Grid, [...Store, true]["length"], [...Store, true]>
// 		: false;

// type ValidateRegion<> = unknown;

// type GetRegion<> = unknown;

// you only need to validate rows
type Validate<Grid extends unknown[]> = ValidateRows<GetRows<Grid>>;

// Tests

import { Equal, Expect } from "type-testing";

type test_sudoku_1_actual = Validate<
  [
    //   ^?
    [["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"]],
    [["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"]],
    [["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"]],
    [["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"], ["🔴", "🌩️", "🌟"]],
    [["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"]],
    [["⚡", "☄️", "❤️"], ["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"]],
    [["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"], ["🌩️", "🔴", "⚡"]],
    [["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"]],
    [["❤️", "🌟", "☄️"], ["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"]]
  ]
>;
type test_sudoku_1 = Expect<Equal<test_sudoku_1_actual, true>>;

type test_sudoku_2_actual = Validate<
  [
    //   ^?
    [["🌩️", "💨", "☄️"], ["🌟", "🦌", "⚡"], ["❤️", "🔴", "💃"]],
    [["🌟", "⚡", "❤️"], ["🔴", "💃", "☄️"], ["🌩️", "💨", "🦌"]],
    [["🔴", "🦌", "💃"], ["💨", "❤️", "🌩️"], ["🌟", "⚡", "☄️"]],
    [["❤️", "☄️", "🌩️"], ["💃", "⚡", "🔴"], ["💨", "🦌", "🌟"]],
    [["🦌", "💃", "⚡"], ["🌩️", "🌟", "💨"], ["🔴", "☄️", "❤️"]],
    [["💨", "🌟", "🔴"], ["🦌", "☄️", "❤️"], ["⚡", "💃", "🌩️"]],
    [["☄️", "🔴", "💨"], ["❤️", "🌩️", "🦌"], ["💃", "🌟", "⚡"]],
    [["💃", "❤️", "🦌"], ["⚡", "🔴", "🌟"], ["☄️", "🌩️", "💨"]],
    [["⚡", "🌩️", "🌟"], ["☄️", "💨", "💃"], ["🦌", "❤️", "🔴"]]
  ]
>;
type test_sudoku_2 = Expect<Equal<test_sudoku_2_actual, true>>;

type test_sudoku_3_actual = Validate<
  [
    //   ^?
    [["🦌", "🔴", "💃"], ["🌩️", "☄️", "💨"], ["⚡", "❤️", "🌟"]],
    [["🌟", "⚡", "💨"], ["❤️", "💃", "🔴"], ["☄️", "🌩️", "🦌"]],
    [["☄️", "🌩️", "❤️"], ["⚡", "🌟", "🦌"], ["💃", "🔴", "💨"]],
    [["🌩️", "💃", "🔴"], ["🦌", "💨", "⚡"], ["🌟", "☄️", "❤️"]],
    [["❤️", "☄️", "⚡"], ["💃", "🌩️", "🌟"], ["🦌", "💨", "🔴"]],
    [["💨", "🌟", "🦌"], ["☄️", "🔴", "❤️"], ["🌩️", "💃", "⚡"]],
    [["💃", "💨", "🌟"], ["🔴", "🦌", "☄️"], ["❤️", "⚡", "🌩️"]],
    [["🔴", "❤️", "☄️"], ["🌟", "⚡", "🌩️"], ["💨", "🦌", "💃"]],
    [["⚡", "🦌", "🌩️"], ["💨", "❤️", "💃"], ["🔴", "🌟", "☄️"]]
  ]
>;
type test_sudoku_3 = Expect<Equal<test_sudoku_3_actual, true>>;

type test_sudoku_4_actual = Validate<
  [
    //   ^?
    [["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"]],
    [["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"]],
    [["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"]],
    [["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"], ["🔴", "🌩️", "🌟"]],
    [["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"]],
    [["⚡", "☄️", "❤️"], ["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"]],
    [["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"], ["⚡", "🔴", "🌟"]],
    [["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"]],
    [["❤️", "🌟", "☄️"], ["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"]]
  ]
>;
type test_sudoku_4 = Expect<Equal<test_sudoku_4_actual, false>>;

type test_sudoku_5_actual = Validate<
  [
    //   ^?
    [["🌩️", "💨", "☄️"], ["🌟", "🦌", "⚡"], ["❤️", "🔴", "💃"]],
    [["🌟", "⚡", "❤️"], ["🔴", "💃", "☄️"], ["🌩️", "💨", "🦌"]],
    [["🔴", "🦌", "💃"], ["💨", "❤️", "🌩️"], ["🌟", "⚡", "☄️"]],
    [["❤️", "☄️", "🌩️"], ["💃", "⚡", "🔴"], ["💨", "🦌", "🌟"]],
    [["🦌", "💃", "⚡"], ["🌩️", "🌟", "💨"], ["🔴", "☄️", "❤️"]],
    [["💨", "🌟", "🔴"], ["🦌", "☄️", "❤️"], ["⚡", "💃", "🌩️"]],
    [["☄️", "🔴", "💨"], ["❤️", "💃", "🦌"], ["💃", "🌟", "⚡"]],
    [["💃", "❤️", "🦌"], ["⚡", "🔴", "🌟"], ["☄️", "🌩️", "💨"]],
    [["⚡", "🌩️", "🌟"], ["☄️", "💨", "💃"], ["🦌", "❤️", "🔴"]]
  ]
>;
type test_sudoku_5 = Expect<Equal<test_sudoku_5_actual, false>>;

type test_sudoku_6_actual = Validate<
  [
    //   ^?
    [["⚡", "🔴", "🌩️"], ["🦌", "❤️", "💨"], ["💨", "🌟", "☄️"]],
    [["❤️", "🦌", "🌟"], ["💨", "🌟", "🔴"], ["💃", "⚡", "🌩️"]],
    [["💨", "💃", "🌟"], ["☄️", "⚡", "🌩️"], ["🔴", "❤️", "🦌"]],
    [["🦌", "⚡", "🔴"], ["❤️", "💃", "💨"], ["☄️", "🌩️", "🌟"]],
    [["🌟", "🌩️", "💃"], ["⚡", "🔴", "☄️"], ["❤️", "🦌", "💨"]],
    [["☄️", "💨", "❤️"], ["🌟", "🌩️", "🦌"], ["⚡", "💃", "🔴"]],
    [["🌩️", "☄️", "💨"], ["💃", "🦌", "⚡"], ["🌟", "🔴", "❤️"]],
    [["🔴", "❤️", "⚡"], ["🌩️", "☄️", "🌟"], ["🦌", "💨", "💃"]],
    [["💃", "🌟", "🦌"], ["🔴", "💨", "❤️"], ["🌩️", "☄️", "⚡"]]
  ]
>;
type test_sudoku_6 = Expect<Equal<test_sudoku_6_actual, false>>;
