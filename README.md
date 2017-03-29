<p align="center">
  <img src="https://github.com/sdgluck/mewt/blob/master/mewt.png" />
</p>

<p><h1 align="center">mewt</h1></p>

<p align="center">Immutability in under one kilobyte</p>

<p align="center">Made with ❤ at <a href="http://www.twitter.com/outlandish">@outlandish</a></p>
  
<p align="center">
    <a href="http://badge.fury.io/js/mewt"><img alt="npm version" src="https://badge.fury.io/js/mewt.svg" /></a>
</p>

<hr/>

:seedling: Under 1kb, tiny API, zero dependencies.

:+1: Makes all native array methods immutable operations.

:v: Two simple methods `$set` and `$unset` for objects and arrays.

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

Create an immutable instance from a JavaScript array or object.

Both objects and arrays have the `$set` and `$unset` methods.

```js
const immutableArray = immutable([])
const immutableObject = immutable({})

immutableArray[0] = 'Van Morrison' //=> Error "array is immutable"
immutableObject.name = 'Van Morrison' //=> Error "object is immutable"
```

### Array

Use `$set` and `$unset` to create new array with applied change.

Use all array instance methods as usual, however those that would normally return a single 
non-array value (pop, push, shift, unshift) will return an array containing the value and a new array
(see part 2 in example below).

```js
const arr = immutable([])

// 1. all array instance methods are available
const arr1 = arr.concat('bubble')

    console.log(arr1) //=> ['bubble']
    console.log(arr1 === arr) //=> false

// 2. methods with non-array return value (push, pop, shift, unshift)
// also return new array, accessible via destructuring
const [val, arr2] = arr1.pop()

    console.log(val) //=> 'bubble'
    console.log(arr2) //=> []
    console.log(arr2 === arr1) //=> false
    
// 3. use $set and $unset to get new array with changes
const arr3 = arr2.$set(0, 'Iggy Pop')
    
    console.log(arr3) //=> ['Iggy Pop']
    console.log(arr3 === arr2) //=> false
```

### Object

Use `$set` and `$unset` to create new object with applied change.

```js
const obj = immutable({})

// 1. properties are added/updated using `$set`
const obj1 = obj.$set('album', 'Hunky Dory')

    console.log(obj1) //=> {album: 'Hunky Dory'}
    console.log(obj1 === obj) //=> false

// 2. properties are deleted using `$unset`
const obj2 = obj1.$unset('album')

    console.log(obj2) //=> {}
    console.log(obj2 === obj1) //=> false
```

## Contributors

`mewt` has received contributions from these wonderful people:

[Balázs Édes](https://github.com/bali182), [Scott Humphries](https://github.com/sscotth), [Michael J. Ryan](https://github.com/tracker1), [Jamie Curtis](https://github.com/jcurtis)

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out the [great video tutorials on egghead.io](http://bit.ly/2aVzthz)!
