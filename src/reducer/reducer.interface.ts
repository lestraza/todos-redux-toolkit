export interface IState {
    todos: ITodo[];
    error?: string;
    isLoading?: boolean;
    isShowModal?: boolean;
}

export interface ITodo {
    id: number;
    title: string;
}
