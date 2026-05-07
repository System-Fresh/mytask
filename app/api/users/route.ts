// app/api/users/route.ts
import { clerkClient, auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // Fetch the full user object from Clerk to verify the role
        const user = await clerkClient.users.getUser(userId);
        const role = user.publicMetadata.role;

        if (role !== "admin") {
            console.log("Access Denied for user:", userId, "Role:", role);
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const users = await clerkClient.users.getUserList();
        const response = users.map(u => ({
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.emailAddresses[0].emailAddress,
            role: u.publicMetadata.role || "user",
        }));

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}