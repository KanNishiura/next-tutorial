"use client";

import React, { useState } from "react";
import { Task } from "../types";
import { deleteTodo, editTodo } from "../components/action/serverActions";

interface TodoProps {
    todo: Task;
}

const Todo = ({ todo }: TodoProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskTitle, setEditedTaskTitle] = useState(todo.title);
    const [completed, setCompleted] = useState(todo.completed);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("title", editedTaskTitle);
        formData.append("completed", String(completed));

        await editTodo(todo.id, formData);
        setIsEditing(false);
    };

    const handleCheckboxChange = async () => {
        const updatedCompleted = !completed;
        setCompleted(updatedCompleted);

        const formData = new FormData();
        formData.append("title", editedTaskTitle);
        formData.append("completed", String(updatedCompleted));

        await editTodo(todo.id, formData);
    };

    return (
        <li key={todo.id} className="flex justify-between px-2 py-2 mb-2 border rounded">
            <div className="flex items-center justify-center">
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
                        value={editedTaskTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEditedTaskTitle(e.target.value)
                        }
                    />
                ) : (
                    <span className={completed ? "line-through mx-auto" : "mx-auto"}>
                        {todo.title}
                    </span>
                )}
            </div>
            <div className="flex items-center justify-center">
                {isEditing ? (
                    <button
                        className="bg-blue-400 text-white hover:bg-blue-500 mr-1 my-auto px-2 rounded"
                        onClick={handleSave}
                    >
                        保存
                    </button>
                ) : (
                    <button
                        className="bg-green-400 text-white hover:bg-green-600 mr-1 my-auto px-2 rounded"
                        onClick={handleEdit}
                    >
                        編集
                    </button>
                )}
                <form action={() => deleteTodo(todo.id)}>
                    <button
                        className="bg-red-400 text-white hover:bg-red-600 mr-1 my-auto px-2 rounded"
                        type="submit"
                    >
                        削除
                    </button>
                </form>
            </div>
        </li>
    );
};

export default Todo;
