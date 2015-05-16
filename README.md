Dijits
===============

[![Build Status](https://travis-ci.org/liamg/dijits.svg?branch=master)](https://travis-ci.org/liamg/dijits) [![Coverage Status](https://coveralls.io/repos/liamg/dijits/badge.svg?branch=master)](https://coveralls.io/r/liamg/dijits?branch=master)

JavaScript library to convert between numbers and words: 407 -> Four hundred and seven

Build
-----

[Grunt](http://gruntjs.com) is used to build the project:

    $ npm install
    $ grunt

Usage
-----

Include the built file at `dist/dijits.min.js` in your web page.

You can now use dijits like this:

```javascript
dijits.numberToWords(17); // Outputs "seventeen"
dijits.numberToWords(8.6); // Outputs "eight point six"
dijits.numberToWords(100000000000); // Outputs "one hundred billion"
dijits.numberToWords(999); // Outputs "nine hundred and ninety nine"
```
