import pipe from './pipe';
import { loopPerformance } from './performance';

describe('Performance tests of pipe ', () => {
  const iterations = 5;
  const arraySize = 10e6;
  const array = Array.from({ length: arraySize }).map((_, i: number) => i);

  test('For-loop: Map is slower <x2 times', () => {
    const forLoopFn = () => {
      const res = [];
      for (let i = 0; i < array.length; i += 1) {
        res[i] = array[i];
      }
    };
    const mapFn = () => {
      pipe(array)
        .map(_ => _)
        .build();
    };
    const estimation = loopPerformance(iterations, [
      { label: 'for-loop', fn: forLoopFn },
      { label: 'pipe:map', fn: mapFn },
    ]);
    expect(estimation['pipe:map']).toBeLessThan(estimation['for-loop'] * 2);
  });

  test('For-loop (optimized): Map is slower <x2 times', () => {
    const forLoopFn = () => {
      const res = [];
      const len = array.length;
      for (let i = 0; i < len; i += 1) {
        res[i] = array[i];
      }
    };
    const mapFn = () => {
      pipe(array)
        .map(_ => _)
        .build();
    };
    const estimation = loopPerformance(iterations, [
      { label: 'for-loop', fn: forLoopFn },
      { label: 'pipe:map', fn: mapFn },
    ]);
    expect(estimation['pipe:map']).toBeLessThan(estimation['for-loop'] * 2);
  });

  test('For-loop (optimized) x2: Map x2 is slower <x2 times', () => {
    const forLoopFn = () => {
      const res = [];
      const len = array.length;
      for (let i = 0; i < len; i += 1) {
        res[i] = array[i] + 1;
      }
      for (let i = 0; i < len; i += 1) {
        res[i] = res[i] * 2;
      }
    };
    const mapFn = () => {
      pipe(array)
        .map(i => i + 1)
        .map(i => i * 2)
        .build();
    };
    const estimation = loopPerformance(iterations, [
      { label: 'for-loop', fn: forLoopFn },
      { label: 'pipe:map', fn: mapFn },
    ]);
    expect(estimation['pipe:map']).toBeLessThan(estimation['for-loop'] * 2);
  });

  test('For-of: Map is is slower <x2 times', () => {
    const forOfFn = () => {
      const res = [];
      for (const i of array) {
        res[i] = i;
      }
    };
    const mapFn = () => {
      pipe(array)
        .map(_ => _)
        .build();
    };
    const estimation = loopPerformance(iterations, [
      { label: 'for-of', fn: forOfFn },
      { label: 'pipe:map', fn: mapFn },
    ]);
    expect(estimation['pipe:map']).toBeLessThan(estimation['for-of'] * 2);
  });

  test('For-of x2: Map x2 is slower <x2 times', () => {
    const forOfFn = () => {
      const res: number[] = [];
      let i = 0;
      for (const item of array) {
        res[i] = item + 1;
        i += 1;
      }
      let j = 0;
      for (const item of res) {
        res[j] = item * 2;
        j += 1;
      }
    };
    const mapFn = () => {
      pipe(array)
        .map(i => i + 1)
        .map(i => i * 2)
        .build();
    };
    const estimation = loopPerformance(iterations, [
      { label: 'for-of', fn: forOfFn },
      { label: 'pipe:map', fn: mapFn },
    ]);
    expect(estimation['pipe:map']).toBeLessThan(estimation['for-of'] * 2);
  });

  test('forEach: Map is slower <x2 times', () => {
    const forEachFn = () => {
      const res = [];
      array.forEach((v, i) => {
        res[i] = v;
      });
    };
    const mapFn = () => {
      pipe(array)
        .map(_ => _)
        .build();
    };
    const estimation = loopPerformance(iterations, [
      { label: 'for-each', fn: forEachFn },
      { label: 'pipe:map', fn: mapFn },
    ]);
    expect(estimation['pipe:map']).toBeLessThan(estimation['for-each'] * 2);
  });

  test('forEach x2: Map x2 is slower <x2 times', () => {
    const forEachFn = () => {
      const res = [];
      array.forEach((v, i) => {
        res[i] = v + 1;
      });
      array.forEach((v, i) => {
        res[i] = v * 2;
      });
    };
    const mapFn = () => {
      pipe(array)
        .map(i => i + 1)
        .map(i => i * 2)
        .build();
    };
    const estimation = loopPerformance(iterations, [
      { label: 'for-each', fn: forEachFn },
      { label: 'pipe:map', fn: mapFn },
    ]);
    expect(estimation['pipe:map']).toBeLessThan(estimation['for-each'] * 2);
  });

  test('mapArray: Map is faster', () => {
    const mapArrayFn = () => {
      array.map(_ => _);
    };
    const mapFn = () => {
      pipe(array)
        .map(_ => _)
        .build();
    };
    const estimation = loopPerformance(iterations, [
      { label: 'map', fn: mapArrayFn },
      { label: 'pipe:map', fn: mapFn },
    ]);
    expect(estimation['pipe:map']).toBeLessThan(estimation['map']);
  });

  test('mapArray x2: Map x2 is faster', () => {
    const mapArrayFn = () => {
      array
      .map(i => i + 1)
      .map(i => i * 2);
    };
    const mapFn = () => {
      pipe(array)
      .map(i => i + 1)
      .map(i => i * 2)
        .build();
    };
    const estimation = loopPerformance(iterations, [
      { label: 'map', fn: mapArrayFn },
      { label: 'pipe:map', fn: mapFn },
    ]);
    expect(estimation['pipe:map']).toBeLessThan(estimation['map']);
  });
});
