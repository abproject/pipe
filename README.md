[![Build Status](https://travis-ci.org/abproject/pipe-array.svg?branch=master)](https://travis-ci.org/abproject/pipe-array)
[![Coverage Status](https://coveralls.io/repos/github/abproject/pipe-array/badge.svg?branch=master)](https://coveralls.io/github/abproject/pipe-array?branch=master)
# pipe-array
Node.js module for optimizing performance in array chaining transformations, e.g.
```javascript
array.filter(i => i % 2 === 0).map(i => i + 1);
```

## Install
```javascript
npm i --save pipe-array
```
#### Run tests
Jest based
```javascript
npm run test
```
or
```javascript
npm run test:watch

```
## Example
```javascript
import pipe from 'pipe-array';

const array = [1, 2, 4, 5, 6, 7, 8];

const outcome = pipe(array)
  .filter(i => i % 2 === 0)
  .map(i => i * 2)
  .build((p, i) => p + i, 0);
// [2, 4, 6, 8]
// [4, 8, 12, 16]
// 40
```

## Recommendations
Use with large array >10e6 as it is still slower than: `for-loop`, for-of`, `forEach`. But it is faster than `Array.prototype.map`.

## Specification
#### pipe
Constructor
```typescript
(array: any[]) => Pipe;
```
returns an object
```typescript
{
  map(fn: Map): Pipe,
  filter(fn: Filter): Pipe;
  build: (fn?: Reduce, initialValue?: any) => any | any[];
}
```
witch can be chained with `map` and `filter` in any order many times.
#### map
```typescript
(currentValue: any, currentIndex?: number, array?: any[]) => any;
```
Follows the `Array.prototype.map` specification.
#### filter
```typescript
(element: any, index?: number, array?: any[], thisArg?: ThisType<any>) => boolean;
```
Follows the `Array.prototype.filter` specification.
#### build
```typescript
(fn?: Reduce, initialValue?: any) => any | any[];boolean;
```
If no parameter provided just applies early defined `map`s and `filter`s.
If provided `reduce` function, outcome will be transformed

#### reduce
```typescript
(accumulator: any | any[], currentValue: any, currentIndex?: number, array?: any[])
```
Follows the `Array.prototype.reduce` specification.
