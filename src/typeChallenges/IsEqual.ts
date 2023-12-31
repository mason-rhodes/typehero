import { Equal, Expect } from "type-testing";

type IsEqual<X, Y> = (<T>() => T extends X
	? 1
	: 2) extends <T>() => T extends Y ? 1 : 2
		? true
		: false;

// Tests

type cases = [
  Expect<Equal<IsEqual<1, 1>, true>>,
  Expect<Equal<IsEqual<1, 2>, false>>,
  Expect<Equal<IsEqual<never, never>, true>>,
  Expect<Equal<IsEqual<never, any>, false>>,
  Expect<Equal<IsEqual<unknown, any>, false>>,
  Expect<Equal<IsEqual<unknown, unknown>, true>>,
  Expect<Equal<IsEqual<any, any>, true>>,
]