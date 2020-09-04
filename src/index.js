import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import reducer from "./reducer/index";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
    ...reducer,
    middleware: getDefaultMiddleware(),
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
