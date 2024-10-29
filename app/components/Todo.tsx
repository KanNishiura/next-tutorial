"use client"

import React, { useRef, useState } from "react"
import { Task } from "../types";
import { deleteTodo, editTodo } from "../api/todo/api";
import { useRouter } from "next/navigation";

interface TodoProps {
    todo: Task
}

const Todo = ({ todo }: TodoProps) => {
    const router = useRouter();

    const ref = useRef<HTMLInputElement>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskTitle, setEditedTaskTitle] = useState(todo.title);
    const [completed, setCompleted] = useState(todo.completed);

    const handleEdit = async () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        await editTodo(todo.id,editedTaskTitle,todo.completed);
 
        setIsEditing(false);
        router.refresh();
    };

    const handleCheckboxChange = async () => {
        const updatedCompleted = !completed;
        setCompleted(updatedCompleted);
        await editTodo(todo.id, editedTaskTitle, updatedCompleted); 
        router.refresh();
    };

    const handleDelete = async () =>{
            await deleteTodo(todo.id);
        router.refresh();
    }

    return(
        <li 
            key={todo.id} 
            className="flex justify-between px-2 py-2 mb-2 border rounded"
        >
            <div className="flex">
                <div className="mr-2">
                    <input 
                        type="checkbox" 
                        id="completed" 
                        name="completed" 
                        checked={completed} 
                        onChange={handleCheckboxChange} 
                    />
                </div>
                {isEditing ? (
                    <input 
                        type="text" 
                        className="mr-2 py-1 px-2 mx-auto rounded border-gray-400 border"
                        value={editedTaskTitle ?? undefined}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEditedTaskTitle(e.target.value)
                        }
                        />
                    ):
                    <span className={completed ? "line-through mx-auto " : " mx-auto "}>
                        {todo.title}
                    </span>
                }
                
            </div>
            <div>
            {isEditing ? (
                <button 
                    className="bg-blue-400 text-white hover:bg-blue-500 mr-1  my-auto  px-2 rounded" 
                    onClick={handleSave}>保存</button>
            ):(
                <button 
                    className="bg-green-400 text-white hover:bg-green-500 mr-1  my-auto  px-2 rounded" 
                    onClick={handleEdit}
                    >編集</button>
            )}
                
                <button 
                    className="bg-red-400 text-white hover:bg-red-600 my-auto px-2 rounded"
                    onClick={handleDelete}
                    >削除</button>
            </div>
        </li>
    )
};

export default Todo;