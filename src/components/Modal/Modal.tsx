import * as React from "react";
import Button from "../commons/Button";

import IconButton from "../commons/IconButton";
import close from "../../images/close.svg";
import { useDispatch, useSelector } from "react-redux";
import reducer from "../../reducer";
import { postNewTaskReq, fetchTodo } from "../../requests/reqiests";
import { IState } from "../../reducer/reducer.interface";

export interface IModalProps {}

const Modal: React.FunctionComponent<IModalProps> = (props) => {
    const [newTitle, setNewTitle] = React.useState("");
    const isShowModal = useSelector((state: IState) => state.isShowModal);
    const error = useSelector((state: IState) => state.error);
    const dispatch = useDispatch();

    const onChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setNewTitle(value);
    };

    const savePost = () => {
        if (newTitle) {
            postNewTaskReq(newTitle).then(() => {
                dispatch(fetchTodo());
                dispatch(reducer.actions.showModal());
            });
        } else {
            dispatch(
                reducer.actions.setError({
                    error: "Заголовок не может быть пустым.",
                })
            );
        }
    };

    return (
        <div className={`modal ${isShowModal ? "modal--show" : ""}`}>
            <div className="modal--header">
                <div>Краткое описание</div>
                <IconButton
                    isSecondary={true}
                    icon={close}
                    onClick={() => dispatch(reducer.actions.showModal())}
                />
            </div>
            <input type="text" value={newTitle} onChange={onChangeInputText} />
            <div className="error">{error}</div>
            <div className="modal--button">
                <Button value="Создать" isPrimary={true} action={savePost} />
            </div>
        </div>
    );
};

export default Modal;
