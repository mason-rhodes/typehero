type ReverseArray<
  Arr extends unknown[],
  Store extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? ReverseArray<Rest, [First, ...Store]>
  : Store;

type FlipArguments<
  T extends (...args: any) => any,
  ArgsStore extends unknown[] = []
> = T extends (...args: infer A) => infer Return
  ? (...args: ReverseArray<A>) => Return
  : never;

//Tests

import { Equal, Expect } from "type-testing";

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<
    Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>
  >,
  Expect<
    Equal<
      FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
      (arg0: boolean, arg1: number, arg2: string) => void
    >
  >
];

type errors = [
  // @ts-expect-error
  FlipArguments<"string">,
  // @ts-expect-error
  FlipArguments<{ key: "value" }>,
  // @ts-expect-error
  FlipArguments<["apple", "banana", 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>
];
