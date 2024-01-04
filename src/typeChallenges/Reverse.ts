type Reverse<T extends unknown[], Store extends unknown[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? Reverse<Rest, [First, ...Store]>
  : Store;

//Tests
import { Equal, Expect } from "type-testing";

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<["a", "b"]>, ["b", "a"]>>,
  Expect<Equal<Reverse<["a", "b", "c"]>, ["c", "b", "a"]>>
];

type errors = [
  // @ts-expect-error
  Reverse<"string">,
  // @ts-expect-error
  Reverse<{ key: "value" }>
];
