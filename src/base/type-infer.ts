// 注意区分类型和值
// user是一个值
const user = {
    name: 'yuchi',
    age: 12,
    id: '0'
};
// 这个一个类型 类型体操是基于类型来演算的，类型和值不是一个东西
type UserType = typeof user;



// keyof操作符
// keyof主要用于返回类型的key，跟mapped类型配合，进行类型体操
type Point = {
    x: number;
    y: number;
};
type P = keyof Point; // x | y

// 如果类型有string或者number index signature， keyof会返回index signature类型
type Arrayish = {
    [index: number]: boolean;
};
type Mapish = {
    [key: string]: boolean;
};

type NumberIndex = keyof Arrayish;
// js中object的key总是会被转为字符串调用
type IntersectionType = keyof Mapish;



// indexed Access Types
type InferPerson = {
    age: number;
    name: string;
    alive: boolean;
};
type InferT1 = InferPerson['age' | 'name'];
type InferT2 = InferPerson[keyof InferPerson];

const InferArray = [
    { name: 'Alice', age: 15 },
    { name: 'Bob', age: 23 },
    { name: 'Eve', age: 38 }
];
type InferArrayItem = typeof InferArray[number];


// 映射类型
// 可以任务是以一个类型为参数的函数，返回另外的一个类型
interface PersonPartial {
    name?: string;
    age?: number;
}

type ReadonlySelf<T> = {
    readonly [K in keyof T]: T[K];
};
type ReadonlyPerson = ReadonlySelf<PersonPartial>;

type InferPartial<T> = {
    [K in keyof T]?: T[K];
};
// 上面的类型都是同质的，没有引入额外的property
// 下面的类型是非同质的，引入和额外的key
type RecordPersonPartial = Record<'x' | 'y', PersonPartial>;
// keyof any是 number | string | symbol的联合类型，js中key的类型只能为这三个
type TsKeyType = keyof any;



// 条件类型
// T extends U ? X : Y 表示如果T类型可以赋值给U类型，则返回X类型，否则Y类型
type TypeName<T> = T extends string
    ? 'string'
    : T extends number
    ? 'number'
    : T extends boolean
    ? 'boolean'
    : T extends undefined
    ? 'undefined'
    : T extends Function
    ? 'function'
    : 'object';

type T0 = TypeName<string>;
type T1 = TypeName<'a'>;
type T2 = TypeName<2>;
type T3 = TypeName<true>;
type T4 = TypeName<undefined>;
type T5 = TypeName<null>;
type T6 = TypeName<() => {}>;
// 联合类型的条件运算符
// T extends U ? X : Y
// 如果T= A | B | C  该运算解析为 (A extends U ? X :Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
type T7 = TypeName<2 | '2'>;
// infer关键字引用
// infer用来引用出入的类型
type ReturnTypeSelf<T> = T extends (...args: any[]) => infer U ? U : any;
type R0 = ReturnTypeSelf<() => number>;
// infer example2
type UnpackSelf<T> = T extends (infer U)[]
    ? U
    : T extends (...args: any[]) => infer U
    ? U
    : T extends Promise<infer U>
    ? U
    : T;
type U0 = UnpackSelf<string[]>;
type U1 = UnpackSelf<() => string>;
type U2 = UnpackSelf<Promise<number>>;
// ts在lib.es5.d.ts文件中内置了很多比较有用的类型运算符
