import React, { useEffect, useState } from 'react';
import summmryApi from '../common';
import { toast } from 'react-toastify';

const AllUser = () => {
    const [allUser, setAllUser] = useState([]);

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
        <div>
            <table className="w-full user-table">
                <thead>
                    <tr>
                        <th>srNo</th>
                        <th>name</th>
                        <th>email</th>
                        <th>role</th>
                        <th>created at</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUser;
