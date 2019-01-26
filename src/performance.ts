interface Estimation {
  [key: string]: number[];
}

function estimate(label: string): () => { label: string; runTime: number } {
  const startTime = performance.now();
  return () => ({ label, runTime: performance.now() - startTime });
}

export function loopPerformance(
  loops: number,
  fns: { label: string; fn: Function }[],
): {[key: string]: number} {
  const estimation: Estimation = fns.reduce(
    (e: Estimation , fn) => {
      e[fn.label] = [];
      return e;
    },
    {});
  Iterations:
  for (let i = 0; i < loops; i += 1) {
    Function:
    for (let j = 0; j < fns.length; j += 1) {
      const { label, fn } = fns[j];
      const start = estimate(label);
      fn.call(null);
      const outcome = start();
      estimation[outcome.label].push(outcome.runTime);
    }
  }
  return Object.keys(estimation).reduce(
    (obj, label) => {
      const executionTime = estimation[label];
      const avg = executionTime.reduce((a, c) => a + c) / executionTime.length;
      obj[label] = avg;
      return obj;
    },
    {} as any);
}
