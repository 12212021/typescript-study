// Partial<Type> 将属性变为可选
interface Todo {
    title: string;
    description: string;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return {
        ...todo,
        ...fieldsToUpdate,
    };
}


// Required<Type> Partial的对面，将所有的可选属性变成必选
interface Props {
    a?: number;
    b?: number;
}
const obj: Props = {
    a: 5,
};
const obj1: Required<Props> = {
    a: 5,
};


// Readonly<Type> 将所有的属性变成只读
const todo: Readonly<Todo> = {
    title: 'Delete inactive user',
    description: 'delete',
};
todo.title = '111';


// Record<Keys, Type> 通过key和type来构造一个新的类型
interface CatInfo {
    age: number;
    breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';
const cats: Record<CatName, CatInfo> = {
    miffy: { age: 10, breed: 'Persian' },
    boris: { age: 5, breed: 'Maine Coon' },
    mordred: { age: 16, breed: 'British Shorthair' },
};


// Pick<Type, Keys> Omit<Type, Keys>
const pickedTod: Pick<Todo, 'title' | 'description'> = {
    title: '11',
    description: '22',
};
const omitTodo: Omit<Todo, 'title'> = {
    description: '22',
};
