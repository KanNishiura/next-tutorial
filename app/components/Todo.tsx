import React from "react"
import { Task } from "../types";

interface TodoProps {
    todo: Task
}

const Todo = ({ todo }: TodoProps) => {
    return(
        <li 
            key={todo.id} 
            className="flex justify-between px-2 py-2 mb-2 border rounded"
        >
            <div className="flex">
                <div className="mr-2">
                <input type="checkbox" id="completed" name="completed" />
                </div>
                <span>{todo.title}</span>
            </div>
            <div>
                <button className="bg-green-400 text-white hover:bg-green-500 mr-1 px-2 rounded">編集</button>
                <button className="bg-red-400 text-white hover:bg-red-600 px-2 rounded">削除</button>
            </div>
        </li>
    )
};

export default Todo;