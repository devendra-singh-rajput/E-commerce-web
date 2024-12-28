import React, { useEffect, useState } from 'react';
import summmryApi from '../common';
import { toast } from 'react-toastify';
import { LiaUserEditSolid } from "react-icons/lia";
import ChangeRole from '../components/ChangeRole';

const AllUser = () => {
    const [allUser, setAllUser] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        userName: "",
        role: "",
        _id: ""
    });
    const [loading, setLoading] = useState(true);

    const fetchAllUser = async () => {
        setLoading(true);
        try {
            const fetchData = await fetch(summmryApi.allUser.url, {
                method: summmryApi.allUser.method,
                credentials: 'include',
            });

            const dataResponse = await fetchData.json();
            if (dataResponse.success) {
                setAllUser(dataResponse.data || []);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("An error occurred while fetching users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUser();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">User Management</h2>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="overflow-y-auto h-[40rem]">
                    <table className="w-full border-collapse text-left text-sm text-gray-600">
                        <thead className="sticky -top-1 bg-gray-700 text-white">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Created Date</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-6 text-center text-gray-900">
                                        Loading...
                                    </td>
                                </tr>
                            ) : (
                                allUser.map((el, index) => (
                                    <tr
                                        key={el._id || index}
                                        className="hover:bg-gray-200 transition-colors border text-gray-800 font-semibold"
                                    >
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{el.userName || el.name}</td>
                                        <td className="px-4 py-2">{el.email}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 rounded text-sm font-medium ${
                                                    el.role === "ADMIN"
                                                        ? "bg-blue-100 text-blue-600"
                                                        : el.role === "User"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {el.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            {new Date(el.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-500 hover:text-white transition-colors"
                                                onClick={() => {
                                                    setUpdateUserDetails(el);
                                                    setOpenUpdateRole(true);
                                                }}
                                            >
                                                <LiaUserEditSolid />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {openUpdateRole && (
                <ChangeRole
                    onClose={() => setOpenUpdateRole(false)}
                    userName={updateUserDetails.userName}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUser}
                />
            )}
        </div>
    );
};

export default AllUser;
