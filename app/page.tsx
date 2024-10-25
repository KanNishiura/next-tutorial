import Image from "next/image";
import TodoList from "./components/TodoList";
import AddTask from "./components/AddTask";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="font-bold">TODO</h1>
      <div className="mt-5 bg-white p-5">
        
        <AddTask />
        <TodoList />

      </div>
    </main>
  );
}