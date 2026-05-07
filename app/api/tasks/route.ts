import prisma from "@/app/utils/connect";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } =  auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401});
        }
        const {title, description, date, completed, important} = await req.json();
        if (!title || !description || !date) {
            return NextResponse.json({
                error: "Missing required fields",
                status:400,
            });
        }

        if (title.length < 3) {
            return NextResponse.json({
                error: "Title must be at least 3 characters long",
                status: 400,
            })
        }
        const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
                userId,
            }
        });
        console.log("Task CREATED: ", task)
        return NextResponse.json(task);
    } catch (error) {
        console.log("ERROR CREATING TASK: ", error)
        return NextResponse.json({ error: "Error creating task", status: 500});
    }
}
export async function GET(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401})
        }

        const user = await clerkClient.users.getUser(userId);
        const isAdmin = user.publicMetadata.role === "admin";

        
      
        const tasks = await prisma.task.findMany({
            where: isAdmin ? {} : { userId },
        });
        
        return NextResponse.json(tasks);

    } catch (error) {
        return NextResponse.json({ error: "Error getting task", status: 500})
    }
}
export async function PUT(req: Request) {
    try {
        const { userId } = auth();
        if (!userId)  return NextResponse.json({ error: "Unauthorized", status: 401});
       
        // Get user and check if admin
        const user = await clerkClient.users.getUser(userId)
        const isAdmin = user.publicMetadata.role === "admin";


        const { id, title, description, date, isCompleted, important } = await req.json();



        // if (!id) {
        //     return NextResponse.json({ error: "Task ID is required", status: 400});
        // }
        const task = await prisma.task.update({
            where: {
                id: id,
              ...(isAdmin ? {} :  {userId: userId}),
            },
            data: {
                title: title !== undefined ? title : undefined,
                description: description !== undefined ? description : undefined,
                date: date !== undefined ? date : undefined,
                isCompleted: isCompleted !== undefined ? isCompleted : undefined,
                isImportant: important !== undefined ? important : undefined,
            }
        });
        return NextResponse.json(task);

    } catch (error) {
        console.log("ERROR UPDATING TASK: ", error)
        return NextResponse.json({ error: "Error updating task", status: 500})
    }
}


// export async function DELETE(req: Request) {
//     try {

//     } catch (error) {
//         console.log("ERROR DELETING TASK: ", error)
//         return NextResponse.json({ error: "Error deleting task", status: 500})
//     }
// }