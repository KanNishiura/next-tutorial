'use client'

import React from "react";
import { addTodo } from "../components/action/serverActions";
import { SubmitHandler, useForm } from "react-hook-form";
import { Task } from "../types";
import { revalidatePath } from "next/cache";
import { validationSchema } from "../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const AddTask = () => {

    const { 
        handleSubmit, 
        register, 
        reset,
        formState: { errors } 
    } = useForm<Task>( {mode : "onChange", resolver:zodResolver(validationSchema)});

    const onSubmit = async (data : Task) => {
        console.log(errors);
        console.log("errors");
        const formData = new FormData();
        formData.append("title", data.title);

        await addTodo(formData);

        reset();
    };

    return (
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <input 
                {...register("title")}
                placeholder="TODO を入力"
                type="text" 
                className="w-full border px-4 py-2 rounded"
                defaultValue=""
            />
             <span>{errors.title?.message as React.ReactNode}</span>
            <Button
                type="submit"
                className="mt-2 w-full px-4 py-1 rounded text-white"
            >
                追加
            </Button>
        </form>
    );
};

export default AddTask;
