'use client'

import React from "react";
import { addTodo } from "../components/action/serverActions";
import { SubmitHandler, useForm } from "react-hook-form";
import { Task } from "../types";
import { revalidatePath } from "next/cache";

const AddTask = () => {

    const { 
        handleSubmit, 
        register, 
        formState: { errors } 
    } = useForm();

    const onSubmit = (data : any) => {
        console.log(errors);
        console.log("errors");
        const formData = new FormData();
        formData.append("title", data.title);

        addTodo(formData);

        // const res =revalidatePath('/');

        // console.log(res);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                {...register("title", { required: true })}
                placeholder="TODO を入力"
                type="text" 
                className="w-full border px-4 py-2 rounded"
                defaultValue=""
            />
            {errors.title && <span>errsor</span>}
            <button 
                type="submit"
                className="mt-2 w-full px-4 py-1 rounded text-white bg-blue-400 hover:bg-blue-500"
            >
                追加
            </button>
        </form>
    );
};

export default AddTask;
