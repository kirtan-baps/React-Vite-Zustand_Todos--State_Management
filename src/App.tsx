/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { todoStore } from "./state/todoStore";


function App() {
  const [todo, setTodo] = useState("");
  // const addTodo = todoStore((state) => state.addTodo)
  // const todos = todoStore((state) => state.todos)

  const todoState = todoStore()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (todo.length > 0) {

      todoState.addTodo({
        id: randomID(),
        todo: todo,
        isDone: false,
      });

      setTodo('');

    }
  }


  const randomID = (): number => {
    const min = 1000;
    const max = 9999;
    return Math.round(Math.random() * (max - min + 1)) + min;
  }


  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center ">
        <div className="w-[600px] p-2 rounded-md shadow-lg bg-zinc-900">
          <h1 className="text-2xl font-bold ">TODOs</h1>
          <p className="text-3xl">Add your Daily task!</p>
          <form action="" onSubmit={handleSubmit}>
            <div className="mt-5">

              <input
                type="text"
                className="w-full h-10 rounded-lg bg-[#282828] outline-red-400 border border-red-400"
                placeholder="Enter your todo"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
            </div>

          </form>

          <div className="mt-5 ">
            {
              todoState.todos.length > 0 && todoState.todos.map((item) => {
                return (
                  <>
                    <div key={item.id} className="w-full rounded-lg p-2 border border-green-400 mb-2 flex justify-between items-center">
                      ID : {item.id}
                      <div className={`${item.isDone ? "line-through" : ""}`}>Work : {item.todo}</div>
                      <div className={`${item.isDone ? "line-through" : ""}`}>Status : {item.isDone ? "Completed" : "Not Completed"}</div>
                      {/* <h1 className="w-full rounded-lg p-2 border border-red-400 ">{item.todo}</h1> */}
                      <div className="flex">
                        <input className="mr-2" type="checkbox" onChange={(e) => todoState.toggleTodo(item.id, e.target.checked)} checked={item.isDone} />
                        <button onClick={() => todoState.deleteTodo(item.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff0055" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                        </button>
                      </div>
                    </div>
                  </>
                );
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
