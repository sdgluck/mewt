# mewt

> :ant: Immutability in under a kilobyte

## Install

```sh
npm install --save mewt
```

```sh
yarn add mewt
```

## Import
 
```js
// ES2015
import immutable from 'mewt'
```

```js
// CommonJS
var immutable = require('mewt')
```

## Usage

```js
const arr = immutable([])

// all array instance methods are available
const [,arr1] = arr.push('bubble')
console.log(arr1 === arr) //=> false

// methods with return value also return new array
const [val, arr2] = arr1.pop()
console.log(val) //=> 'bubble'
console.log(arr2 === arr1) //=> false
```

## API

Create an immutable instance from a JavaScript array or object:

```js
let immutableArray = immutable([])
let immutableObect = immutable({})
```

### Array

### Object
