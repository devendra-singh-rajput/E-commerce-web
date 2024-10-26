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

    const fetchAllUser = async () => {
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
        }
    };

    useEffect(() => {
        fetchAllUser();
    }, []);

    return (
        <div>
            <div className="overflow-hidden">
                <div className="overflow-y-auto h-[32rem]"> {/* Adjust height as necessary */}
                    <table className="w-full user-table">
                        <thead className='sticky -top-1 bg-black text-white'>
                            <tr>
                                <th>SrNo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUser.map((el, index) => (
                                <tr key={el._id || index} className='hover:bg-slate-100'>
                                    <td>{index + 1}</td>
                                    <td>{el.userName || el.name}</td>
                                    <td>{el.email}</td>
                                    <td>{el.role}</td>
                                    <td>
                                        {new Date(el.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </td>
                                    <td>
                                        <button 
                                            className='bg-green-100 cursor-pointer p-2 hover:bg-green-500 hover:text-white rounded-full'
                                            onClick={() => {
                                                setUpdateUserDetails(el);
                                                setOpenUpdateRole(true);
                                            }}>
                                            <LiaUserEditSolid />
                                        </button>
                                    </td>
                                </tr>
                            ))}
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
