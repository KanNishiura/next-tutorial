"use client"

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { addTodo } from "../api/todo/api";

const AddTask = () => {

    const randomId =Math.floor(Math.random() * 100000);
    const router = useRouter();

    const [taskTitle,setTaskTitle] = useState("")

    const handleSubmit = async (e: FormEvent) => {
    
        console.log("start handleSubmit");
        e.preventDefault();

        if (!taskTitle) return;

        await addTodo({id: randomId, title: taskTitle, completed:false});

        setTaskTitle("");
        router.refresh();
    };

    return (

    <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            className="w-full border px-4 py-2 rounded"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTaskTitle(e.target.value)
            }
            value={taskTitle}
            required
        />
        <button className="mt-2 w-full px-4 py-1 rounded text-white bg-blue-400 hover:bg-blue-500">追加</button>
    </form>
    );
};

export default AddTask;