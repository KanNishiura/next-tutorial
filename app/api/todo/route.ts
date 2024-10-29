
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function main() {
    try {
        await prisma.$connect();
    } catch (error) { 
        return Error("DB接続失敗")
    }
}

export const GET = async (req: Request , res: NextResponse) => {
    console.log("start GET");
    try{
        await main();
        const todos = await prisma.todoList.findMany(); 
        return NextResponse.json({ message: "Success", todos },{status:200});
    } catch (error) {
        return NextResponse.json({ message: "Error", error},{status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export const POST = async (req: Request , res: NextResponse) => {
    console.log("start POST");
    try{
        const { id,title, completed } = await req.json();
        await main();
        const addTodos = await prisma.todoList.create({
            data: {
            id,
            title,
            completed: false,
            },
        });
        return NextResponse.json({ message: "Success", addTodos },{status:201});
    } catch (error) {
        console.log("エラー" + error);
        return NextResponse.json({ message: "Error", error},{status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

