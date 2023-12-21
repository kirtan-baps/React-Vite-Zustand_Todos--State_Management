/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type TodoType = {
    id: number;
    todo: string;
    isDone: boolean;
};

type States = {
    todos: Array<TodoType> | [];
};

type Actions = {
    addTodo: (todo: TodoType) => void;
    toggleTodo: (id: number, isChecked: boolean) => void;
    deleteTodo: (id: number) => void;
};


// Simple
// export const todoStore = create<States & Actions>((set) => ({
//     todos: [],
//     addTodo: (todo: TodoType) =>
//         set((state) => ({ todos: [todo, ...state.todos] })),
// })
// );

// for devtools and persist (persist means save in local memory)
export const todoStore = create<States & Actions>()(
    devtools(

        persist(
            (set) => ({
                todos: [],
                addTodo: (todo: TodoType) =>
                    set((state) => ({
                        todos: [todo, ...state.todos]
                    })),
                toggleTodo: (id: number, isChecked: boolean) =>
                    set((state) => ({
                        todos: state.todos.map((item) => {
                            if (item.id === id) {
                                item.isDone = isChecked
                            }
                            return item;
                        })
                    })),
                deleteTodo: (id: number) =>
                    set((state) => ({
                        todos: state.todos.filter((item) => {
                            return item.id !== id;
                        })
                    })),
            }),
            { name: "todoStore" }
        )
    )
);
