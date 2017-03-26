<p align="center">
  <img src="https://github.com/sdgluck/mewt/blob/master/mewt.png" />
</p>

<p><h1 align="center">mewt</h1></p>

<p align="center">:seedling: Immutability in under a kilobyte</p>

<p align="center">Made with ❤ at <a href="http://www.twitter.com/outlandish">@outlandish</a></p>
  
<p align="center">
    <a href="http://badge.fury.io/js/mewt"><img alt="npm version" src="https://badge.fury.io/js/mewt.svg" /></a>
</p>

<hr/>

:cookie:  Under 1kb unminified. Zero dependencies.

:point_right: Built for Node ES2015 environments. Use a bundler, transpiler, and Proxy polyfill as required.

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

Create an immutable instance from a JavaScript array or object:

```js
let immutableArray = immutable([])
let immutableObect = immutable({})
```

### Array

```js
const arr = immutable([])

// all array instance methods are available
const arr1 = arr.concat('bubble')

    console.log(arr) //=> ['bubble']
    console.log(arr1 === arr) //=> false

// methods with non-array return value also return new 
// array via destructuring (push, pop, shift, unshift)
const [val, arr2] = arr1.pop()

    console.log(val) //=> 'bubble'
    console.log(arr2) //=> []
    console.log(arr2 === arr1) //=> false
```

### Object

```js
const obj = immutable({})

// properties are added/updated using `$set`
const obj1 = obj.set('album', 'Hunky Dory')

    console.log(obj1) //=> {album: 'Hunky Dory'}

// properties are deleted using `$unset`
const obj2 = obj1.$unset('album')

    console.log(obj2) //=> {}
```
