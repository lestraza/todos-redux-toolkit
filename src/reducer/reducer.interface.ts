export interface IState {
    todos: ITodo[];
    error?: string;
    isLoading?: boolean;
    isShowModal?: boolean;
    selectedId?: number | undefined;
    editingTodo?: ITodo | undefined;
}

export interface ITodo {
    id: number;
    title: string;
}
