// 泛型主要是为了解决函数、类、对象通用性的问题，在ts中可以利用any类型解决
// 但是使用any类型丧失了类型信息，在这种情况下泛型应运而生


// 泛型函数
// 可以任务函数identity的参数arg是类型T，T可以是任何类型
function identity<T>(arg: T) {
    // T因为可以是任何类型，所有有的类型上面可能不存在lenght属性
    // console.log(arg.length);
    return arg;
}

function loggingIndentity<T>(arg: T[]) {
    // 参数arg被约束为数组，存在length属性
    console.log(arg.length);
    return arg;
}

let myIdentity: <U>(arg: U) => U = identity;




// 泛型接口

// 是一个普通的约束函数的接口，只是该函数是泛型函数
interface GenericIndentityFn {
    <T>(arg: T): T
}
let myIdentity1: GenericIndentityFn = identity;


// 泛型参数约束接口
interface GenericIndentity<T> {
    length: number;
    state: T
}
let genericText: GenericIndentity<string> = {
    length: 2,
    state: 'generic'
}
let genericText1: GenericIndentity<number> = {
    length: 2,
    state: 3
}



// 泛型约束

interface LengthWise {
    length: number
}
function loggingIndentity1<T extends LengthWise>(arg: T): T {
    // 泛型参数T约束于LenghtWise接口，所以一定存在length属性
    console.log(Text.length);
    return arg;
}

loggingIndentity1('text');
// number类型不存在lenght属性，所以编译报错
loggingIndentity1(2);
loggingIndentity1({
    length: 4,
    someting: 'useless'
});

// 泛型参数和泛型参数之间的约束关系
// K约束于T，K是T的key，这个函数用于获取对象的key对应的value
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
let constraintTest = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
}
getProperty(constraintTest, 'a');
// m不是constraintTest的key
getProperty(constraintTest, 'm');

