import React, {useEffect } from "react";
import { Task } from "../types";
import Todo from "./Todo";

interface TodoListProps {
    todos: Task[];
}

const TodoList = ({ todos }: TodoListProps ) => {
    return (
    <ul className="my-4">
         {todos.map((todo)=>(
            <Todo key={todo.id} todo={todo}/>
        ))}
    </ul>
    );
};

export default TodoList;