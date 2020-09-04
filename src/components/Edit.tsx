import * as React from "react";
import Header from "./Header";
import Button from "./commons/Button";

import { RouteComponentProps, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ITodo, IState } from "../reducer/reducer.interface";
import { deleteTodoReq, fetchTodo, editTodoReq } from "../requests/reqiests";
import reducer, { removeErrorActionCreator } from "../reducer";

export interface IEditProps extends RouteComponentProps<{ id?: string }> {}

export const Edit: React.FunctionComponent<IEditProps> = (props) => {
    const [editingTodo, setEditingTodo] = React.useState<ITodo | undefined>(undefined);
    const [hasChangedTitle, setHasChangeTitle] = React.useState<boolean>(false);

    const dispatch = useDispatch();

    const todos = useSelector((state: IState) => state.todos);
    const error = useSelector((state: IState) => state.error);
    const isLoading = useSelector((state: IState) => state.isLoading);
    const id = props.match.params.id;

    React.useEffect(() => {
        if (id && todos) {
            const todo = todos.find((todo) => todo.id.toString() === id);
            if (todo) {
                setEditingTodo({
                    ...editingTodo,
                    title: todo!.title,
                    id: parseInt(id),
                });
            }
        }
    }, [todos]);

    const onClickDeleteTodo = () => {
        if (id) {
            deleteTodoReq(parseInt(id)).then(() => {
                setEditingTodo(undefined);
                dispatch(fetchTodo());
                setHasChangeTitle(false);
            });
        }
    };

    const onChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
       
        setEditingTodo({ ...editingTodo!, title: value });
        setHasChangeTitle(true);
    };

    const onClickEditTodo = () => {
        if (editingTodo) {
            editTodoReq(editingTodo).then((res) => {
                if (res.data.success) {
                    setHasChangeTitle(false);
                    dispatch(fetchTodo());
                    dispatch(removeErrorActionCreator());
                }
            });
        } else {
            dispatch(
                reducer.actions.setError({
                    error: "Это поле не может быть пустым",
                })
            );
        }
    };

    return (
        <React.Fragment>
            {!isLoading &&
                (editingTodo ? (
                    <div>
                        <Header
                            title={`Задача №${editingTodo?.id}`}
                            buttonValue="Удалить"
                            buttonAction={onClickDeleteTodo}
                        />
                        <div className="edit">
                            <div className="edit--header">
                                <div>Краткое описание</div>
                            </div>
                            <input
                                type="text"
                                value={editingTodo?.title}
                                onChange={onChangeInputText}
                            />
                            <div className="error">{error}</div>
                            {!hasChangedTitle ? (
                                <div className="back">
                                    <Link to="/">
                                        <Button
                                            value="Вернуться к списку"
                                            width="180px"
                                            isInfo={true}
                                        />
                                    </Link>
                                </div>
                            ) : (
                                <Button
                                    value="Сохранить"
                                    action={onClickEditTodo}
                                    isInfo={true}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="back">
                        <div className="back--title">
                            Такой задачи не существует, попробуйте открыть
                            другую
                        </div>
                        <div className="back--button">
                            <Link to="/">
                                <Button
                                    value="Вернуться к списку"
                                    width="180px"
                                    isInfo={true}
                                />
                            </Link>
                        </div>
                    </div>
                ))}
        </React.Fragment>
    );
};
