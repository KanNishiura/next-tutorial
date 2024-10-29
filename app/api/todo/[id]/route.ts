import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { main } from '../route';

const prisma = new PrismaClient();

export const PUT = async (req: Request , res: NextResponse) => {
    console.log("update");
    try{
        const id:number = parseInt(req.url.split("/todo/")[1]);
        const { title, completed } = await req.json();

        await main();
        const todos = await prisma.todoList.update({
            data: { title, completed },
            where: { id },
        }); 
        
        return NextResponse.json({ message: "Success", todos },{status:200});
    } catch (error) {
        return NextResponse.json({ message: "Error", error},{status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export const DELETE = async (req: Request , res: NextResponse) => {
    console.log("DELETE");
    try{
        const id:number = parseInt(req.url.split("/todo/")[1]);

        await main();
        const todos = await prisma.todoList.delete({
            where: { id },
        }); 

        return NextResponse.json({ message: "Success", todos },{status:200});
    } catch (error) {
        return NextResponse.json({ message: "Error", error},{status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
