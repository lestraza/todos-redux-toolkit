import * as React from "react";

import IconButton from "./commons/IconButton";
import pen from "../images/pen.svg";
import bucket from "../images/bucket.svg";

import { Link } from "react-router-dom";
import { ITodo } from "../reducer/reducer.interface";

export interface ITodoProps {
    todo: ITodo;
    action: (id: number) => void;
}

const Todo: React.FunctionComponent<ITodoProps> = (props) => {
    const { todo } = props;
    const { id, title } = todo;
    const onClickSendId = () => {
        props.action(id);
    };
    return (
        <div className="todo">
            <div className="todo_id">{id}</div>
            <div className="todo_title">{title}</div>
            <div className="todo_action">
                <Link to={`/${id}`}>
                    <IconButton isPrimary={true} icon={pen} />
                </Link>
                <IconButton
                    isSecondary={true}
                    icon={bucket}
                    onClick={onClickSendId}
                />
            </div>
        </div>
    );
};

export default Todo;
