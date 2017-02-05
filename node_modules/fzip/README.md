# fzip [![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david] [![DevDependency Status][david-dev-badge]][david-dev]

[![npm](https://nodei.co/npm/fzip.png)](https://nodei.co/npm/fzip/)

[travis-badge]: https://travis-ci.org/eush77/fzip.svg
[travis]: https://travis-ci.org/eush77/fzip
[david-badge]: https://david-dm.org/eush77/fzip.png
[david]: https://david-dm.org/eush77/fzip
[david-dev-badge]: https://david-dm.org/eush77/fzip/dev-status.png
[david-dev]: https://david-dm.org/eush77/fzip#info=devDependencies

Zip collections and map or iterate over the result at once. Combination of `zip` and `map`, or `zip` and `forEach`.

Accepts functions and string specs (to build objects from). Falls back to plain `zip`.

## Examples

```js
> fzip([0, 1, 2], [2, 1, 0], function (a, b) {
    return a + b;
  })
[2, 2, 2]

> fzip([0, 1, 2], function (x) {
    return 2 - x;
  })
[2, 1, 0]

> fzip(['mom', 'dad', 'dog'], ['dear', 'awesome', 'joyful'], 'name, adjective')
[ { name: 'mom', adjective: 'dear' },
  { name: 'dad', adjective: 'awesome' },
  { name: 'dog', adjective: 'joyful' } ]

> fzip([0, 1, 2], [2, 1, 0])
[[0, 2], [1, 1], [2, 0]]

> fzip([0, 1, 2])
[[0], [1], [2]]


> sums = []
> fzip.each([0, 1, 2], [2, 1, 0], function (a, b) {
    sums.push(a + b);
  })
> sums
[2, 2, 2]

> sum = 0
> fzip.each([0, 1, 2], function (a) {
    sum += a;
  })
> sum
3
```

## API

### fzip([array]..., func)

Apply `func` to arrays, passing one argument per array each time. Collect returned values in the resulting array.

Return `null` if no arrays given.

### fzip([array]..., spec)

Construct array of objects according to a string `spec`, which must comprise object keys, separated by comma and optional whitespace. The number of keys and the number of arrays should match.

Return `null` if no arrays given.

### fzip([array]...)

Zip arrays into a single array of corresponding items (see examples).

Return `null` if no arrays given.

### fzip.each([array]..., func)

Similar to `fzip([array]..., func)`, but does not collect the results.

## Install

```shell
npm install fzip
```

## License

MIT