import pipe from './pipe';

describe('Integration tests of pipe ', () => {
  test('Map -> Map', () => {
    const array: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const mapFn = (x: number) => x * 2;
    const outcome = pipe(array)
      .map(mapFn)
      .map(mapFn)
      .build();
    expect(outcome).toEqual(array.map(mapFn).map(mapFn));
  });

  test('Filter -> Filter', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const filterFn = (x: number) => x % 2 === 0;
    const filterFnLess5 = (x: number) => x < 5;
    const outcome = pipe(array)
      .filter(filterFn)
      .filter(filterFnLess5)
      .build();
    expect(outcome).toEqual(array.filter(filterFn).filter(filterFnLess5));
  });

  test('Filter -> Map -> Map -> Filter -> Reduce', () => {
    const array: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const filterFn1 = (x: number) => x > 0;
    const mapFn1 = (x: number) => x - 1;
    const mapFn2 = (x: number) => x * 1;
    const filterFn2 = (x: number) => x % 2 === 0;
    const reduceFn = (accumulator: number, x: number) => accumulator + x;
    const outcome = pipe(array)
      .filter(filterFn1)
      .map(mapFn1)
      .map(mapFn2)
      .filter(filterFn2)
      .build(reduceFn);
    expect(outcome).toEqual(
      array
        .filter(filterFn1)
        .map(mapFn1)
        .map(mapFn2)
        .filter(filterFn2)
        .reduce(reduceFn),
    );
  });
});
