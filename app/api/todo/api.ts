import { Task } from "@/app/types";

export const fetchAllTodos = async():Promise<Task[]> => {
    console.log("fetchAllTodos");

    const res = await fetch('http://localhost:3000/api/todo',{
      cache: "no-store", 
    })
  
    const data = await res.json();

    return data.todos;
}

export const addTodo = async (task: Task): Promise<Task[]> => {
    console.log("addTodo");

    const res = await fetch('http://localhost:3000/api/todo',{
        method:"POST",
        headers:{
        "content-type": "application/json",
        },
        body: JSON.stringify({ id: task.id, title: task.title, completed: task.completed }),
    });
    const newTodo = res.json();

    return newTodo;
}

export const editTodo = async (id: number, newText: string, completed:boolean): Promise<Task[]> => {

    const res = await fetch('http://localhost:3000/api/todo/' + id ,{
        method:"PUT",
        headers:{
        "content-type": "application/json",
        },
        body: JSON.stringify({ title: newText , completed: completed }),
    });
    const updatedTodo = res.json();
    
    return updatedTodo;
}

export const deleteTodo = async (id: number): Promise<Task[]> => {

    const res = await fetch('http://localhost:3000/api/todo/' + id ,{
        method:"DELETE",
        headers:{
        "content-type": "application/json",
        },
        body: JSON.stringify({}),
    });
    const deletedTodo = res.json();

    return deletedTodo;
}