// 原始数据类型
let bool: boolean = true;
let num: number = 2;
let str: string = 'char';

// 这里会出现类型不能重新分配的编译错误
// bool = 2;

// 数组
let arr1: number[] = [1, 2, 3];
// 这种涉及到泛型的类型运算
let arr2: Array<number> = [1, 2, 3];
// 类型联合，数组的内容可能是数字也可能是字符串
let arr3: Array<number | string> = [1, 2, '9'];


// 元组tuple 允许设定一个固定的类型和固定长度的数组
let tuple: [number, string] = [0, '1'];
tuple.push(2);
// console.log(tuple); // [0, "1", 2]

// tuple虽然能够push元素，但是不能访问越界的元素
// 会编译报错
// tuple[2]


// 函数

// 函数表达式赋值
let add = (x: number, y: number): number => x + y;
// 函数声明
let computed: (x: number, y: number) => number;
computed = (a, b) => a + b;


// 对象
let obj: { x: number, y: number } = {
    x: 1,
    y: 2
}
obj.x = 3;


// Symbol
let s1: symbol = Symbol();
let s2: symbol = Symbol();


// undefined null
let undef: undefined = undefined;
let nul: null = null;
let numTest: number = 2;
// 不能将null分配给number类型
// null和undefined是所有类型的子类型，类型是兼容的
// 不能分配的原因是ts默认了更严格的类型检查原则，只要将ts.config中"strictNullChecks": false即可
numTest = null;
numTest = undefined;


// void 是类型的底层，代表着没有类型，可以看成是没有返回值的函数
let noReturn = () => { };

// any 是类型的顶层，在写代码的时候可能并不知道变量的类型
let y: any = 2;
y = [1, 2, 3]
y = { 'as': 1 }


// never 代表了一个类型永远也不会发生 一般指代死循环的函数或者抛出异常的函数
function error(message: string): never {
    throw new Error(message);
}

function fail(): never {
    return error('Someting fails');
}

function infiniteLoop(): never {
    while (true) {

    }
}



// 数字枚举
enum Color {
    Red,
    Green,
    Blue
}
let c: Color = Color.Red;
let b: string = Color[0]; // Red

// 字符串枚举
enum Message {
    Success = '恭喜你，成功了',
    Fail = '抱歉，失败了'
}
// 字符串枚举不能数字索引的方式来取值



