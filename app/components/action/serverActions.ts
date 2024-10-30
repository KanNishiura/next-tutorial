"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function main() {
    try {
        await prisma.$connect();
    } catch (error) { 
        
        console.error("エラー:", error);
        throw new Error("DB接続に失敗しました");
        
    }
};

export const allTodos = async() => {

    console.log("start GET");
    try{
        await main();
        const todos = await prisma.todoList.findMany(); 
        return todos;
    } catch (error) {
        console.error("エラー:", error);
        throw new Error("DB接続に失敗しました");
    } finally {
        await prisma.$disconnect();
    }
};

export const addTodo = async (formData: FormData) => {

    const randomId =Math.floor(Math.random() * 100000);
    const title = formData.get("title") as string;

    if (!title) {
        throw new Error("Todoを入力してください");
    }

    try {
        await main();
        await prisma.todoList.create({
            data: {
                id: randomId,
                title: title,
                completed: false,
            },
        });
        
        revalidatePath('/')
    } catch (error) {
        console.error("エラー:", error);
        throw new Error("Todoの追加に失敗しました");
    } finally {
        await prisma.$disconnect();
    }
};

export const editTodo = async (id: number,formData: FormData) => {

    const title = formData.get("title") as string;
    const completed = formData.get("completed") === "true";

    try {
        await main();
        const todos = await prisma.todoList.update({
            data: { 
                title, 
                completed 
            },
            where: { id },
        }); 
        
        revalidatePath('/')
    } catch (error) {
        console.error("エラー:", error);
        throw new Error("Todoの追加に失敗しました");
    } finally {
        await prisma.$disconnect();
    }
};

export const deleteTodo = async (id: number) => {
    try {
        await main();
        await prisma.todoList.delete({
            where: { id },
        });
        revalidatePath("/");
    } catch (error) {
        console.error("エラー:", error);
        throw new Error("Todoの削除に失敗しました");
    } finally {
        await prisma.$disconnect();
    }
};