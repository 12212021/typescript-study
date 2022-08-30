// 类型推断

// 基础类型的推断
let a; // a会被推断为any类型
let adb = 1;
let stringc = '12';
// 会被推断为(number | null)[]，关闭strictNullChecks会被推断为number[]类型，number类型兼容null类型
let array = [1, null];
// 对象会自动被推断为其具体接口的实现，所以不能赋值
let objAd = {
    a: 1,
    b: 'stringc'
};
objAd = 2;

// 函数类型的推断
// 参数a直接被推断为可选number，返回值会被推断为void
function testAd(a = 2) {}

// 类型兼容性
// core rule：x兼容y，如果y含有所有的x属性（属性值少的兼容属性值多的）
interface Named {
    name: string;
}
let x1: Named;
let y1 = { name: 'ychi', location: 'beijing' };
x1 = y1;

// 函数兼容性
// 1）函数的参数个数需要兼容
// 参数多的能够兼容参数少的
// handler1中y参数可以不用，加入handler1可以赋值给handler2类型，handler2并没有声明y参数，handler1使用y参数会报错
// 这在类型中是不兼容的
let handler1 = (x: number, y: number) => {};
let handler2 = (x: number) => {};
handler1 = handler2;
// handler2 = handler1;

// 可选参数可以认为该参数不存在，仍然符合函数参数少的兼容参数多的原则
let handler3 = (x: number, y?: number) => {};
// 剩余参数可以认为所有的参数都不存在，符合函数参数少的兼容参数多的
let handler4 = (...rest: number[]) => {};

// handler3 = handler1
handler1 = handler3;
handler4 = handler1;
handler4 = handler2;
handler4 = handler3;

// 2）函数的参数类型需要兼容
// 可以将接口的成员个数视为函数参数的个数来判断函数的兼容性，仍然符合函数参数多的兼容参数少的原则
type Point3D = {
    x: number;
    y: number;
    z: number;
};
type Point2D = {
    x: number;
    y: number;
};
let handler5 = (p: Point2D) => {};
let handler6 = (p: Point3D) => {};

handler5 = handler6;
handler6 = handler5;

// 3）函数的返回值需要兼容
// 返回值属性值少的的兼容返回值属性值多的
let handler7 = (): Point2D => ({ x: 1, y: 2 });
let handler8 = (): Point3D => ({ x: 2, y: 3, z: 4 });

handler7 = handler8;
handler8 = handler7;

// 类型保护机制
class Java {
    helloJava() {
        console.log('java');
    }
    java = 'java';
}

class JavaScript {
    helloJavaScript() {
        console.log('javaScript');
    }
    javaScript = 'javaScript';
}

function getLang(type: string): JavaScript | Java {
    let lang = type === 'java' ? new Java() : new JavaScript();
    // 要调用一下对象的方法，如果是java，调用helloJava否则helloJavaScript

    // 1）利用instanceof
    if (lang instanceof Java) {
        // 在这个代码块lang是Java类型
        lang.helloJava();
    } else {
        lang.helloJavaScript();
    }

    // 2)利用in判断属性是否存在于改对象
    if ('java' in lang) {
        lang.helloJava();
    } else {
        lang.helloJavaScript();
    }

    // 3) 利用typeof操作符来判断原始数据类型
    const num: string | number = '2';
    if (typeof num === 'number') {
        // 赋值「"2"」故ts类型推断为never
        Number(num).toFixed(2)
    } else {
        num.toString();
    }
    
    // if (typeof num === 'number') {
    //     num.toFixed();
    // } else {
    //     num.toString();
    // }

    return lang;
}

// 自定义的类型保护机制
interface Fish {
    swim(): any;
    layEggs(): any;
}

interface Bird {
    fly(): any;
    layEggs(): any;
}

function getSmallPet(): Fish | Bird {
    let pet: any = {
        layEggs() {}
    };
    if (Math.random() < 0.5) {
        (pet as Fish).swim = () => {};
    } else {
        (pet as Bird).fly = () => {};
    }
    return pet;
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

function testTypeGuard() {
    let pet = getSmallPet();
    if (isFish(pet)) {
        pet.swim();
    } else {
        pet.fly();
    }
}

// 使用switch语句进行类型保护
interface Square {
    kind: 'square';
    size: number;
}
interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
}
interface Circle {
    kind: 'circle';
    r: 1;
}

type Shape = Square | Rectangle | Circle;
// 函数switch语句并没有覆盖所有case，但是ts编译器没有报错，这里会有隐藏bug
function getArea0(s: Shape) {
    switch (s.kind) {
        case 'square':
            return s.size * s.size;
        case 'rectangle':
            return s.height * s.width;
    }
}
// 明确标注返回值，没有覆盖全部情况下，ts会检测到返回值并不全是number从而报错
function getArea1(s: Shape): number {
    switch (s.kind) {
        case 'square':
            return s.size * s.size;
        case 'rectangle':
            return s.height * s.width;
        // case 'circle':
        //     return Math.PI * s.r * s.r;
    }
}
// 使用default语句
// 最后的never类型函数，当s的类型有漏网之鱼的时候，default语句会执行，s的类型必然不是never类型，从而报错
function getArea2(s: Shape) {
    switch (s.kind) {
        case 'circle':
            return Math.PI * s.r * s.r;
        case 'rectangle':
            return s.height * s.width;
        // case 'square':
        //     return s.size * s.size
        default:
            const exhaustiveCheck: never = s;
            return exhaustiveCheck;
    }
}

// 联合类型和交叉类型

// 1）联合类型
// 表示unionType可以是number、string中的一个，只能取number和stirng中的公共方法
// 通常Union Type会涉及到类型断言、类型保护等机制
let unionTypeTest: number | string;
unionTypeTest = 1;
unionTypeTest = '123';

// 2）交叉类型
// 交叉类型允许你将多个类型表示为一个，可以使用这个多个类型方法属性
class Person {
    constructor(public name: string) {}
}

interface Loggable {
    log(name: string): void;
}

function testIntersectionType(obj: Person & Loggable): void {
    // obj是person和Loggable的联合类型，可以认为是二者的儿子，可以访问父类的所有方法属性
    obj.log(obj.name);
}

// 索引类型
// keyof T返回T多有key的类型，是一个联合类型 key1 | key2 | key3
// T[K] 返回以KWie索引的T对应的值的类型
interface Car {
    manufacturer: string;
    modal: string;
    year: number;
}

let taxi: Car = {
    manufacturer: 'Toyota',
    modal: 'Camray',
    year: 2017
};

function pluck<T, K extends keyof T>(o: T, keys: K[]): T[K][] {
    return keys.map(e => o[e]);
}
