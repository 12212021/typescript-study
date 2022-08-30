// 将类型当做集合来思考问题
type A = 'A'; // 单值集合 { 'A' }
type B = 'B'; // 单值集合 { 'B' }
type AorB = A | B; // 集合的并集 { 'A', 'B' }
type TwoInt = 2 | 4 | 5;
type ThreeInt = 3 | 6 | 9;
type TwoIntersectionThreeInt = TwoInt & ThreeInt;
type TwoUnionThreeInt = 2 | 3 | 4 | 6;
// keyof(A & B) = (keyof A) | (keyof B)
// keyof(A | B) = (keyof A) & (keyof B)

/* 
类型术语和集合术语对照表
Typescript术语                              集合术语
never    *******************************    空集
literal type    ************************    单值集合
value可赋值给T    ***********************    value ∈ T
T1 assignable to T2    *****************    T1是T2的子集
T1 extends T2    ***********************    T1是T2的子集
T1 & T2    *****************************    T1 和T2的交集
unknown    *****************************    全集
*/

// 签名本质上是一种集合映射的关系，ts是如何确定映射之间的父子关系的呢？
type T1th = {[key in 'say']: string};
type T2th = {[key in 'say']: 'hi'};
type T3th = {[key in string]: string};
type T4th = {[key in string]: 'hi'};

/* 
签名是一种映射关系，包含原象（用key指代）和映射象（用value指代）
1、key1 < key2（key1是key2的子集），value1 = value2  =>  entry1 < entry2
2、key1 = key2， value1 < value2 => entry1 < entry2
*/

// 依据上述规则
let t1th: T1th;
let t2th: T2th;
let t3th: T3th;
let t4th: T4th;

t1th = t2th; // t2是t1的子集
t3th = t1th; // t1是t3的子集
t4th = t2th; // t2是t4的子集
t3th = t2th; // t2是t4的子集

/* 函数的参数中，参数是逆变的，返回值是协变的 
1、key1 < key2（key1是key2的子集），value1 = value2  =>  entry1 > entry2
2、key1 = key2， value1 < value2 => entry1 < entry2
*/
// 函数类型的兼容性中，参数是逆变了，为什么需要逆变呢？看下面的例子
const fnth1 = (x: number) => {
    return x * x;
};

const fnth2 = (x: number, y: number) => {
    return x * x + y * y;
};

const highFuncth = (
    cb: (x: number, y: number) => number,
    x: number,
    y: number
) => {
    // 即便cb是fhth1，该调用也传入了足够的参数，cb可以忽略y参数
    const res = cb(x, y);
    console.log(res);
};

highFuncth(fnth1, 1, 2);
highFuncth(fnth2, 1, 2);
/*
这里类型是兼容的，函数类型兼容的一般性应用场景在于高阶函数（将某个A函数作为参数或者作为返回值） 
A函数一般在高阶函数内部要发生调用
 */



//  never类型的使用
interface Foo {
    type: 'foo'
}

interface Bar {
    type: 'bar'
}

type All = Foo | Bar;

function handleVal(val: All) {
    switch (val.type) {
        case 'foo':
            // 这里 val 被收窄为 foo
            break;
        case 'bar':
            // 这里类型被收窄为bar
            break;
        default:
            const neverReach: never = val;
            break;
    }
}

/*
如果有一天
type All = Foo | Bar | Baz
handleVal函数中忘记增加针对Baz的处理逻辑，ts编译器会报错
 */