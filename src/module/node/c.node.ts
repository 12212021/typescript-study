let c1 = require('./a.node');
let c2 = require('./b.node');

console.log(c1, c2); // { x: 1, y: 2 } { c: 3, d: 4 }

// 混用es6模块和commonJS模块导致错误的例子

// 自然认为es6Module变量是a文件中默认导出的函数
let es6Module = require('../es6/a');

console.log(es6Module);
/* 
{
  a: 0,
  b: 2,
  c: 3,
  f: [Function: f],
  G: [Function: g],
  default: [Function: default_1]
}
*/


import defaultFunc = require('../es6/d');
defaultFunc(); //es6 module default!