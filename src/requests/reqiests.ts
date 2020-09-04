import { ITodo } from "../reducer/reducer.interface";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface IFetchTodoResponse {
    data: ITodo[];
    error: string;
    success: string;
}

let url = "https://test.megapolis-it.ru/api/list";

export const fetchTodo = createAsyncThunk(url, async () => {
    const response = await axios.get<IFetchTodoResponse>(url);
    return response.data.data;
});

export function postNewTaskReq(title: string) {
    return axios.post(url, { title });
}

export function editTodoReq(todo: ITodo) {
    const { id, title } = todo;
    return axios.post(`${url}/${id}`, { title });
}

export function deleteTodoReq(id: number) {
    return axios.delete(`${url}/${id}`);
}
