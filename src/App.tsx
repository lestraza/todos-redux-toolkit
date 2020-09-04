import * as React from "react";

import {
    BrowserRouter,
    Switch,
    Route,
    RouteComponentProps,
} from "react-router-dom";
import Home from "./components/Home";
import "./style.css";
import { Edit } from "./components/Edit";
import { useDispatch } from "react-redux";
import { fetchTodo } from "./requests/reqiests";

export interface IAppProps extends RouteComponentProps {}

const App: React.FC<IAppProps> = (props) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchTodo());
    });
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route path={"/"} exact component={Home} />
                    <Route path={"/:id"} exact component={Edit} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
