import React, { useEffect, useState } from 'react';
import summmryApi from '../common';
import { toast } from 'react-toastify';
import { LiaUserEditSolid } from "react-icons/lia";
import ChangeRole from '../components/ChangeRole';

const AllUser = () => {
    const [allUser, setAllUser] = useState([]);
    const [openUpdateRole,setOpenUpdateRole]=useState(false)
    const [updateUserDetails,setUpdateUserDetails]= useState({
        email:"",
        userName:"",
        role:""
        ,_id:""

    });

    const fetchAllUser = async () => {
        try {
            const fetchData = await fetch(summmryApi.allUser.url, {
                method: summmryApi.allUser.method,
                credentials: 'include',
            });

            const dataResponse = await fetchData.json();
            if (dataResponse.success) {
                setAllUser(dataResponse.data || []); // Make sure to access the correct data array
            } else if (dataResponse.error) {
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
        <div >   
            <table className="w-full user-table">
                <thead>
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
                        <tr key={el.id || index}> {/* Use a unique key, id is preferable */}
                            <td>{index + 1}</td>
                            <td>{el?.userName||el?.name}</td>
                            <td>{el?.email}</td>
                            <td>{el?.role}</td>
                            <td>{new Date(el?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td> {/* Format date if needed */}
                            <td><button className='bg-green-100 cursor-pointer p-2 hover:bg-green-500 hover:text-white rounded-full'
                            onClick={()=>{
                                setUpdateUserDetails(el)
                                setOpenUpdateRole(true)}}> <LiaUserEditSolid /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                openUpdateRole &&(<ChangeRole onClose={()=>setOpenUpdateRole(false)}
                 userName={updateUserDetails.userName}
                 email={updateUserDetails.email}
                 role={updateUserDetails.role}
                 userId={updateUserDetails._id}
                />)
            }
        </div>
    );
};

export default AllUser;
