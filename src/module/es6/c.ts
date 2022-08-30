import { a, b, c } from './a'; // 导入多个变量
import { P } from './a'; // 导入接口
import { f as F } from './a'; // 导入时起别名
import * as All from './a'; // 把a文件中多有的导出内容合并到一个All对象中
import defaultFunc from './a'; // 导入默认导出

console.log(All);

/* 
1、 es6中的模块都是静态的，不能在动态的语句中使用import、export语句
2、es6模块和commonJs模块不兼容
    1）es6模块允许一个顶级导出（export default）和多个次级导出（普通的export语句）
    2）commomJS模块中只允许一个顶级导出（module.exports对象）
3、ts的编译选项默认项：
    1）"target": "es5", 将ts编译为es5语法的目标文件
    2）"module": "commonjs", 将ts中的模块编译为commonJS模块
    3）由于es6模块和commonJS模块不兼容，ts会将es6模块的顶级导出，export default编译为commonJS中exports对象中的default属性
4、混用es6模块和commonJS模块会带来错误，详见../node/c.node.ts文件，ts提供了独特的语法来兼容。
*/