"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get("/api/users");
            setUsers(res.data);
        };
        fetchUsers();
    }, []);

    return (

       <div className="w-full px-4 py-8 bg-white">
    <h1 className="text-2xl font-bold mb-6 text-gray-800">App Users</h1>
    
    <div className="w-full">
        {/* Table Header: Hidden on mobile, shown on medium screens and up */}
        <table className="w-full border-collapse">
            <thead className="hidden md:table-header-group">
                <tr className="border-b-2 border-gray-200 text-left">
                    <th className="py-3 px-2 font-semibold text-gray-600">Name</th>
                    <th className="py-3 px-2 font-semibold text-gray-600">Email</th>
                    <th className="py-3 px-2 font-semibold text-gray-600">Role</th>
                </tr>
            </thead>
            
            <tbody className="block md:table-row-group">
                {users.map((user: any) => (
                    <tr 
                        key={user.id} 
                        className="block md:table-row border-b border-gray-200 hover:bg-gray-50 transition-colors py-4 md:py-0"
                    >
                        {/* Name Field */}
                        <td className="block md:table-cell py-2 px-2 text-gray-800 before:content-['Name:'] before:font-bold before:inline-block before:w-20 md:before:hidden">
                            {user.firstName} {user.lastName}
                        </td>
                        
                        {/* Email Field */}
                        <td className="block md:table-cell py-2 px-2 text-gray-600 break-all before:content-['Email:'] before:font-bold before:inline-block before:w-20 md:before:hidden">
                            {user.email}
                        </td>
                        
                        {/* Role Field */}
                        <td className="block md:table-cell py-2 px-2 text-gray-600 before:content-['Role:'] before:font-bold before:inline-block before:w-20 md:before:hidden">
                            <span className="inline-block px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium">
                                {user.role}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

        // <div>
        //     <h1>App Users</h1>
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th>Name</th>
        //                 <th>Email</th>
        //                 <th>Role</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {users.map((user: any) => (
        //                 <tr key={user.id}>
        //                     <td>{user.firstName} {user.lastName}</td>
        //                     <td>{user.email}</td>
        //                     <td>{user.role}</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
    );
}

export default UsersPage;