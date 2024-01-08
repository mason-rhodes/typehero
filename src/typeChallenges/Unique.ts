type IsEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
	? true
	: false;

type Contains<T, Arr extends unknown[]> = Arr extends [infer First, ...infer Rest]
	? IsEqual<T, First> extends false
		? Contains<T, Rest>
		: true
	: false;

type Unique<T extends unknown[], Store extends unknown[] = []> = T extends [
	infer First,
	...infer Rest,
]
	? Contains<First, Store> extends true
		? Unique<Rest, Store>
		: Unique<Rest, [...Store, First]>
	: Store;

// Tests
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]