// 函数声明

// 直接在function关键字后声明，带实现
function funcAdd(x: number, y: number): number {
    return x + y;
}

// funcAdd1实际是一个函数类型，类似于Type的字面量表达式，没有实现
let FuncAdd1: (x: number, y: number) => number;

// 利用type关键字声明一个类型，没有函数的实现
type funcAdd2 = (x: number, y: number) => number;

// 利用接口interface来约束函数的类型
interface FuncAdd3 {
    (x: number, y: number): number
}
// 接口的实现
let funcAdd3Impl: FuncAdd3;
funcAdd3Impl = (x, y) => x + y;




// ts中函数的调用和函数的签名必须是完全匹配的，不能缺少参数
function funcHello(msg: string): void {
    console.log(msg);
}
// funcHello(); // An argument for 'msg' was not provided
funcHello('hello typescript!');

// ts中的可选参数 可选参数必须放在位置参数的后面
function addSometing(x: number, y?: number) {
    return y ? x + y : x;
}
addSometing(1);
addSometing(1, 2);

// ts中的默认参数，默认参数不严格放到位置参数的后面，建议放到默认参数的后面
function saySometing(text: string, msg: string = 'ts', text1: string, text2: string = 'great') {
    console.log(text, msg, text1, text2);
}
// 位于位置参数text1之前的默认参数需要用undefined做占位符，而text2参数则不用
saySometing('hello', undefined, 'good');



// 剩余参数
function buildName(firstName: string, ...restOfNames: string[]) {
    return firstName + ' ' + restOfNames.join(' ');
}



// 函数重载函数列表的顺序是非常重要的
// 函数重载，ts的函数重载和其他静态语言的函数重载有一些不同
// ts函数重载需要扫描整个函数重载列表，当列表中的函数匹配调用参数的时候，调用改函数
let suits: string[] = ['hearts', 'spades', 'clubs', 'diamonds'];
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: any): any {
    if (typeof x === 'object') {
        return Math.floor(Math.random() * x.length);
    }
    else if (typeof x === 'number') {
        const pickedSuit = Math.floor(x / 13);
        return {suit: suits[pickedSuit], card: x % 13}
    }
}
const myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
// 匹配到了第一个函数
const pickedCard1 = myDeck[pickCard(myDeck)];
// 匹配到了第二个函数
const pickedCard2 = pickCard(15);
// console.log(pickedCard1, pickedCard2);