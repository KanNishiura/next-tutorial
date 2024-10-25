import React from "react";

const AddTask = () => {
    return (

    <form>
        <input type="text" className="w-full border px-4 py-2 rounded"/>
        <button className="mt-2 w-full px-4 py-1 rounded text-white bg-blue-400 hover:bg-blue-500">追加</button>
    </form>
    );
};

export default AddTask;