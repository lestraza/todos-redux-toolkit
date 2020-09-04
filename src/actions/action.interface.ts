import { ITodo } from './../reducer/reducer.interface';
export interface IActionPayload {
    todos?: ITodo[]
    error?: string
    editingTodo?: ITodo
}
export interface IActionType {
    type: string,
    payload?: IActionPayload
}

