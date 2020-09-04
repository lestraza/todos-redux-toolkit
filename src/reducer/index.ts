import { fetchTodo } from "../requests/reqiests";
import { IActionType, IActionPayload } from "./../actions/action.interface";
import { IState, ITodo } from "./reducer.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IState = {
    todos: [],
    isLoading: false,
    error: "",
    isShowModal: false,
    selectedId: undefined,
    editingTodo: undefined,
};

const reducer = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setError: (
            state: IState,
            { payload }: PayloadAction<IActionPayload>
        ) => {
            state.error = payload?.error;
        },
        removeError: (state: IState, action: IActionType) => {
            state.error = "";
        },
        isEdititing: (state: IState, { payload }: IActionType) => {
            state.editingTodo = payload?.editingTodo;
        },
        showModal: (state: IState, action: IActionType) => {
            state.isShowModal = !state.isShowModal;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchTodo.fulfilled,
            (state, action: PayloadAction<ITodo[]>) => {
                state.todos = [...action.payload];
                state.isLoading = false;
            }
        );
        builder.addCase(
            fetchTodo.pending,
            (state, action: PayloadAction<any>) => {
                state.isLoading = true;
            }
        );
        builder.addCase(
            fetchTodo.rejected,
            (state, action: PayloadAction<any>) => {
                state.error = action.payload.error;
                state.isLoading = false;
            }
        );
    },
});

export const {
    setError: setErrorActionCreator,
    removeError: removeErrorActionCreator,
    showModal: showModalActionCreator,
} = reducer.actions;

export default reducer;
