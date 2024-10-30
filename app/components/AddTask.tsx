
import React from "react";
import { addTodo } from "../components/action/serverActions";

const AddTask = () => {
    
    return (
        <form action={addTodo}>
            <input 
                placeholder="TODO を入力"
                type="text" 
                name="title" 
                className="w-full border px-4 py-2 rounded"
                defaultValue=""
                required
            />
            <button 
                type="submit"
                className="mt-2 w-full px-4 py-1 rounded text-white bg-blue-400 hover:bg-blue-500">追加</button>
        </form>
    );
};

export default AddTask;