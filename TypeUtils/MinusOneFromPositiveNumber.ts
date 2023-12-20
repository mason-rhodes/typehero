type SubFromNum = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];

type ArrayToNumber<T extends number[], Store extends string = ""> = T extends [
  infer First extends number,
  ...infer Rest extends number[]
]
  ? ArrayToNumber<Rest, `${Store}${First}`>
  : Store extends `${infer Num extends number}`
  ? Num
  : never;

type NumberStringToArray<
  T extends string,
  Store extends number[] = []
> = `${T}` extends `${infer First extends number}${infer Rest}`
  ? NumberStringToArray<Rest, [...Store, First]>
  : Store;

type RemoveZerosFromStart<T extends number[]> = T extends [
  0,
  ...infer Rest extends number[]
]
  ? RemoveZerosFromStart<Rest>
  : T;

type HandleSubFromZero<
  T extends number[],
  LastNumIndex extends number,
  Store extends number[] = []
> = T extends [
  ...infer Rest extends number[],
  infer SecondLast extends number,
  infer Last extends 0
]
  ? SecondLast extends 0
    ? HandleSubFromZero<
        [...Rest, SecondLast],
        Rest["length"],
        [SubFromNum[Last], ...Store]
      >
    : [...Rest, SubFromNum[SecondLast], SubFromNum[Last], ...Store]
  : T[LastNumIndex] extends 0
  ? [-1]
  : T extends [...infer Rest1, infer Last1 extends number]
  ? [...Rest1, SubFromNum[Last1]]
  : [...T, ...Store];

export type MinusOneFromPositiveNumber<T extends number> =
  NumberStringToArray<`${T}`> extends [
    ...infer Rest extends number[],
    infer Last extends number
  ]
    ? Last extends 0
      ? ArrayToNumber<
          RemoveZerosFromStart<
            HandleSubFromZero<[...Rest, Last], Rest["length"]>
          >
        >
      : ArrayToNumber<[...Rest, SubFromNum[Last]]>
    : T;
