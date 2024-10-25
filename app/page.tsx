// "use client";

import Image from "next/image";
import TodoList from "./components/TodoList";
import AddTask from "./components/AddTask";

async function fetchAllTodos() {
  const res = await fetch('http://localhost:3000/api/todo',{
    cache: "no-store", 
  })

  const data = await res.json();
  return data.todos;
}

export default async function Home() {

  const todos = await fetchAllTodos();

  console.log(todos);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="font-bold">TODO</h1>
      <div className="mt-5 bg-white p-5">
        
        <AddTask />
        <TodoList todos={todos}/>

      </div>
    </main>
  );
}