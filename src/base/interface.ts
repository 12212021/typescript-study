//接口主要用来检查一个value是不是符合某一个shape
// 接口就是用来描述shape的，接口可以约束函数、对象、数组等


// 1、约束普通的对象


// 可选属性
interface SquareConfig {
    color?: string,
    width?: number
}
function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSqare = { color: 'red', area: 100 };
    if (config.color) {
        newSqare.color = config.color;
    }
    if (config.width) {
        newSqare.area = config.width * config.width;
    }
    return newSqare;
}
console.log(createSquare({}));

//ts会对对象字面量进行额外的检查，
createSquare({colour: 'red', width: 100});
// 1、as关键字
createSquare({colour: 'red', width: 100} as SquareConfig);
// 2、将接口的前面更改为如下
/* 
interface {
    color?: string,
    width?: string,
    [propName: string]: any
}
*/
// 3、通过变量赋值的情况绕过
let config = { colour: 'red', width: 100 };
// 如果不是对象字面，会绕过额外的属性check
let mySquare1 = createSquare(config);




// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 2; 不能给只读属性赋值





// 接口约束函数
interface SearchFunc {
    // 该约束一个函数，函数存在一个是string的属性
    // 本质上，函数也是对象，如果有多余的
    (source: string, subString: string): boolean;
    name: string; // 因为函数都有有个name属性
    // yanna: string  //如果有多余的属性的话，采用字面函数很难满足shape约束
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}






/* 
接口约束可索引类型
ts可索引类型约束的本质是约束一个对象的key、value的类型
数组是一种特殊的对象，所以也可以用可索引类型来约束

1、js中对象的key只能是string，即使是数组的key在运行时也会被转化为string
这约束ts可索引类型的key只能为string、number两种类型

*/
// 索引的类型被约束为string、number两种类型
interface StringArray {
    // 索引是number类型，value是string类型
    [index: number]: string
}
let myArray: StringArray = ['bob', 'tom'];


class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string
}

// 因为js在运行时，将索引转化为stiring类型 
// 所以索引是number类型的value的type必须是索引是string类型的value的type的子类型
// 才能够符合ts的类型兼容性规则
/* 
interface NotOk {
    [x: number]: Animal;
    [s: string]: Dog
} 
*/

interface Ok {
    [x: number]: Dog,
    [s: string]: Animal
}





// 接口约束类
interface ClockInterface {
    // 接口约束类的公共部分，不会检查类的私有部分
    currentTime: Date,
    setTime: (d: Date) => void
}

class Clock implements ClockInterface {
    currentTime: Date
    constructor(h: number, m: number) {

    }

    setTime(d: Date) {
        this.currentTime = d;
    }
}

// 接口只会对类的实例部分进行检查，不会检查静态部分
interface ClockConstructor {
    new (hour: number, minute: number): Clock1;
}

class Clock1 implements ClockConstructor {
    // 类的构造函数属于静态部分，所以不在ts的检查范围内
    constructor(h: number, m: number) { }
}



// 接口描述混合类型
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void
}

function getCounter() : Counter {
    // as 作为类型断言非常关键，能覆盖ts类型推断的一些不便之处
    let counter = (function (start: number) {return start.toString()}) as Counter;
    counter.interval = 12;
    counter.reset = () => {};
    return counter;
}





// 接口能继承类，接口会继承类所有的成员（共有、私有、受保护），但是不会继承实现
class Control {
    private state: string
}

interface SelectableControl extends Control {
    select(): void
}

class Button extends Control implements SelectableControl {
    select() {}
}

class TextBox extends Control {

}

// 接口继承了某个类的私有成员，那么只有该类或者该类的子类能够实现该接口
class Image implements SelectableControl {
    private state: string;
    select() {}
}