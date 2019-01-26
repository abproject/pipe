type Map = (currentValue: any, currentIndex?: number, array?: any[]) => any;
type Filter = (element: any, index?: number, array?: any[], thisArg?: ThisType<any>) => boolean;
type Reduce = (accumulator: any | any[], currentValue: any, currentIndex?: number, array?: any[])
  => any | any[];
type Lambda = Map | Filter;

type PipeConstructor = (array: any[]) => Pipe;

interface Pipe {
  map(fn: Map): Pipe;
  filter(fn: Filter): Pipe;
  build: (fn?: Reduce, initialValue?: any) => any | any[];
}

const pipe: PipeConstructor = function pipe(arr: any[]): any {
  if (!Array.isArray(arr)) {
    throw new Error(`${arr} is not an array`);
  }
  const fns: Lambda[] = [];
  const fnsType: number[] = [];
  const p: Pipe = {
    map: (fn: Map) => {
      fns[fns.length] = fn;
      fnsType[fnsType.length] = 0b1;
      return p;
    },

    filter: (fn: Filter) => {
      fns[fns.length] = fn;
      fnsType[fnsType.length] = 0b0;
      return p;
    },

    build: (reduceFn?: Reduce, initialValue?: any) => {
      const res: any[] = [];
      const len = arr.length;
      const fnLength = fns.length;
      let index = 0;
      Elements:
      for (let i = 0; i < len; i += 1) {
        let value = arr[i];
        Functions:
        for (let j = 0; j < fnLength; j += 1) {
          if (fnsType[j] === 0b1) {
            // Map
            value = (fns[j] as Map).call(null, value, index, arr);
          } else {
            // Filter
            if (!(fns[j] as Filter).call(null, value, index, arr)) {
              continue Elements;
            }
          }
        }
        res[index] = value;
        index += 1;
      }
      if (reduceFn != null) {
        const len = res.length;
        let i = 0;
        let reduced;
        if (initialValue !== undefined) {
          reduced = initialValue;
        } else {
          reduced = res[i];
          i += 1;
        }
        for (; i < len; i += 1) {
          reduced = reduceFn.call(null, reduced, res[i]);
        }
        return reduced;
      }
      return res;
    },
  };
  return p;
};

export default pipe;
