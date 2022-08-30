//单独导出
export let a = 0;

// 批量导出
let b = 2;
let c = 3;
export { b, c };

// 导出接口
export interface P {
    x: number;
    y: number;
}

// 导出函数
export function f() { }

// 导出时起别名
function g() {

}
export { g as G };


// 默认导出，无需函数的名称
export default function () {
    console.log('i am default');
}


// 引入外部的模块，重新导出
import { str as hello } from './b';
