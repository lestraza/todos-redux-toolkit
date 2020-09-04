import * as React from "react";

import Todo from "./Todo";
import { useSelector, useDispatch } from "react-redux";
import { ITodo, IState } from "../reducer/reducer.interface";
import { deleteTodoReq, fetchTodo } from "../requests/reqiests";

export interface ITableProps {}

const Table: React.FunctionComponent<ITableProps> = (props) => {
    const todos = useSelector((state: IState) => state.todos);
    const dispatch = useDispatch();

    const deleteTodo = (id: number) => {
        deleteTodoReq(id).then(() => {
            dispatch(fetchTodo());
        });
    };

    const renderTodos = () => {
        return todos.map((todo: ITodo) => {
            return <Todo todo={todo} key={todo.id} action={deleteTodo} />;
        });
    };

    return <div className="table">{todos && renderTodos()}</div>;
};
export default Table;
