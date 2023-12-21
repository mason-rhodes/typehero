type Letters = {
  A: ["█▀█ ", "█▀█ ", "▀ ▀ "];
  B: ["█▀▄ ", "█▀▄ ", "▀▀  "];
  C: ["█▀▀ ", "█ ░░", "▀▀▀ "];
  E: ["█▀▀ ", "█▀▀ ", "▀▀▀ "];
  H: ["█ █ ", "█▀█ ", "▀ ▀ "];
  I: ["█ ", "█ ", "▀ "];
  M: ["█▄░▄█ ", "█ ▀ █ ", "▀ ░░▀ "];
  N: ["█▄░█ ", "█ ▀█ ", "▀ ░▀ "];
  P: ["█▀█ ", "█▀▀ ", "▀ ░░"];
  R: ["█▀█ ", "██▀ ", "▀ ▀ "];
  S: ["█▀▀ ", "▀▀█ ", "▀▀▀ "];
  T: ["▀█▀ ", "░█ ░", "░▀ ░"];
  Y: ["█ █ ", "▀█▀ ", "░▀ ░"];
  W: ["█ ░░█ ", "█▄▀▄█ ", "▀ ░ ▀ "];
  " ": ["░", "░", "░"];
  ":": ["#", "░", "#"];
  "*": ["░", "#", "░"];
};

type ArrayToString<T extends string[], Store extends string = ""> = T extends [
  infer First extends string,
  ...infer Rest extends string[]
]
  ? ArrayToString<Rest, `${Store}${First}`>
  : Store;

type StringToArray<
  T extends string,
  Store extends string[] = []
> = T extends `${infer First}${infer Rest}`
  ? StringToArray<Rest, [...Store, First]>
  : Store;

type AddCharToArray<T extends unknown[], Char extends unknown> = T extends [
  infer First extends string,
  infer Second extends string,
  infer Third extends string
]
  ? Char extends keyof Letters
    ? [
        `${First}${Letters[Char][0]}`,
        `${Second}${Letters[Char][1]}`,
        `${Third}${Letters[Char][2]}`
      ]
    : never
  : never;

type CreateLine<
  T extends unknown[],
  Store extends unknown[] = ["", "", ""]
> = T extends [infer First extends string, ...infer Rest]
  ? CreateLine<Rest, AddCharToArray<Store, Uppercase<First>>>
  : Store;

type SplitStringAtNewLine<
  T extends string,
  Store extends unknown[] = [[]]
> = Store extends [
  ...infer Rest extends unknown[],
  infer Curr extends unknown[]
]
  ? T extends `${infer First}\n${infer RestString}`
    ? SplitStringAtNewLine<
        RestString,
        [...Rest, [...Curr, ...StringToArray<First>], []]
      >
    : [...Rest, [...Curr, ...StringToArray<T>]]
  : StringToArray<T>;

type ConvertToAnswer<
  T extends unknown[],
  Store extends unknown[] = []
> = T extends [infer First extends unknown[], ...infer Rest]
  ? ConvertToAnswer<Rest, [...Store, ...CreateLine<First>]>
  : Store;

type ToAsciiArt<T extends string> = ConvertToAnswer<SplitStringAtNewLine<T>>;
