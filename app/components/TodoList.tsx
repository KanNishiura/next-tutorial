import React from "react";
import { Task } from "../types";
import Todo from "./Todo";

interface TodoListProps {
    todos: Task[];
}

const TodoList = async ({ todos = [] }: TodoListProps ) => {

    const completedTodos   = todos.filter((todo: Task) => todo.completed);
    const uncompletedTodos = todos.filter((todo: Task) => !todo.completed);

    return (
        <>
            <ul className="my-4">
                {uncompletedTodos.map((uncompletedTodo)=>(
                    <Todo key={uncompletedTodo.id} todo={uncompletedTodo}/>
                ))}
            </ul>

            {completedTodos.length > 0 && ( 
                <div>
                    <div className="flex items-center justify-center">
                        <hr className="flex-grow border-t" />
                        <span className="mx-2">完了タスク ▼</span>
                        <hr className="flex-grow border-t" />
                    </div>

                    <ul className="my-4">
                        {completedTodos.map((completedTodo) => (
                            <Todo key={completedTodo.id} todo={completedTodo} />
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default TodoList;