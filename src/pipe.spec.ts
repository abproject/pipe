import pipe from './pipe';

describe('Spec tests of pipe ', () => {
  test('Initial: should fail if not array - empty string', () => {
    expect(() => pipe(<any>'')).toThrowError('is not an array');
  });

  test('Initial: should fail if not array - string', () => {
    expect(() => pipe(<any>'somestring')).toThrowError('somestring is not an array');
  });

  test('Initial: should fail if not array - object', () => {
    expect(() => pipe(<any>{})).toThrowError('[object Object] is not an array');
  });

  test('Map: empty', () => {
    const array: number[] = [];
    const mapFn = (x: number) => x;
    const outcome = pipe(array)
      .map(mapFn)
      .build();
    expect(outcome).toEqual(array.map(mapFn));
  });

  test('Map: same output', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const mapFn = (x: number) => x;
    const outcome = pipe(array)
      .map(mapFn)
      .build();
    expect(outcome).toEqual(array.map(mapFn));
  });

  test('Map: numbers', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const mapFn = (x: number) => x * 2;
    const outcome = pipe(array)
      .map(mapFn)
      .build();
    expect(outcome).toEqual(array.map(mapFn));
  });

  test('Map: falsy', () => {
    const array = [0, '', false, null, undefined, NaN];
    const mapFn = (x: any) => !x;
    const outcome = pipe(array)
      .map(mapFn)
      .build();
    expect(outcome).toEqual(array.map(mapFn));
  });

  test('Map: objects', () => {
    const array = [
      { name: 'John', lastname: 'Galt' },
      { name: 'Winston', lastname: 'Smith' },
    ];
    const mapFn = (x: { name: string; lastname: string }) => ({
      fullname: `${x.name} ${x.lastname}`,
    });
    const outcome = pipe(array)
      .map(mapFn)
      .build();
    expect(outcome).toEqual(array.map(mapFn));
  });

  test('Filter: empty', () => {
    const array: number[] = [];
    const filterFn = (x: number) => x % 2 === 0;
    const outcome = pipe(array)
      .filter(filterFn)
      .build();
    expect(outcome).toEqual(array.filter(filterFn));
  });

  test('Filter: same output', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const filterFn = (x: number) => true;
    const outcome = pipe(array)
      .filter(filterFn)
      .build();
    expect(outcome).toEqual(array.filter(filterFn));
  });

  test('Filter: numbers', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const filterFn = (x: number) => x % 2 === 0;
    const outcome = pipe(array)
      .filter(filterFn)
      .build();
    expect(outcome).toEqual(array.filter(filterFn));
  });

  test('Filter: objects', () => {
    const array = [
      { name: 'John', lastname: 'Galt' },
      { name: 'Winston', lastname: 'Smith' },
    ];
    const filterFn = (x: { name: string; lastname: string }) =>
      x.name === 'Winston';
    const outcome = pipe(array)
      .filter(filterFn)
      .build();
    expect(outcome).toEqual(array.filter(filterFn));
  });

  test('Filter: falsy', () => {
    const array: any[] = [0, '', false, null, undefined, NaN];
    const filterFn = (x: number) => !x;
    const outcome = pipe(array)
      .filter(filterFn)
      .build();
    expect(outcome).toEqual(array.filter(filterFn));
  });

  test('Reduce: sum', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const reduceFn = (accumulator: number, x: number) => accumulator + x;
    const outcome = pipe(array).build(reduceFn);
    expect(outcome).toEqual(array.reduce(reduceFn));
  });

  test('Reduce: sum with init value', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const reduceFn = (accumulator: number, x: number) => accumulator + x;
    const outcome = pipe(array).build(reduceFn, 0);
    expect(outcome).toEqual(array.reduce(reduceFn, 0));
  });

  test('Reduce: objects', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const reduceFn = (accumulator: any, x: number) => {
      const isEven = x % 2 === 0;
      if (isEven) {
        accumulator[`a${x}`] = null;
      } else {
        accumulator[`a${x - 1}`] = x;
      }
      return accumulator;
    };
    const outcome = pipe(array).build(reduceFn, {});
    expect(outcome).toEqual(array.reduce(reduceFn, {}));
  });

  test('Reduce: arrays', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const reduceFn = (accumulator: any, x: number) => {
      if (x % 2 === 0) {
        accumulator.push(x);
      }
      return accumulator;
    };
    const outcome = pipe(array).build(reduceFn, []);
    expect(outcome).toEqual(array.reduce(reduceFn, []));
  });
});
