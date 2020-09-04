import * as React from "react";
import Modal from "./Modal/Modal";
import Table from "./Table";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../reducer/reducer.interface";
import reducer from "../reducer";

export interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    const isShowModal = useSelector((state: IState) => state.isShowModal);

    const dispatch = useDispatch();
    const onClickShowModal = () => {
        dispatch(reducer.actions.showModal());
    };

    return (
        <div>
            <Header
                title="Список задач"
                buttonValue="Создать"
                buttonAction={onClickShowModal}
            />
            <Table />
            {isShowModal && <Modal />}
        </div>
    );
};

export default Home;
