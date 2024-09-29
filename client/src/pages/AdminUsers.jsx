import { useEffect, useState } from 'react';
import '../style/AdminUsers.css';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom"

export const AdminUsers = () => {
    const { token } = useAuth();
    const API = "https://servicenow-backend.vercel.app";

    const [data, setData] = useState([]);
    useEffect(() => {
        getAllUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${API}/admin/users/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                getAllUsers();
                const data = await response.json();
                toast.success(data.message);
            }
        } catch (error) {
            console.log("Error in deleteUser ", error);
        }
    }

    const getAllUsers = async () => {
        try {
            const response = await fetch(`${API}/admin/users`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            if (response.ok) {
                const data = await response.json();
                setData(data);
            }

        } catch (error) {
            console.log('Error in AdminUsers ', error);
        }
    };

    return <>
        <div className="contact-content container">
            <div className="main-heading">User Accounts Data</div>
        </div>
        <section className='section'>

            <div className="tbl-header">
                <table className='tableData' border="0">
                    <thead>
                        <tr>
                            <th className='col'>Name</th>
                            <th className='col'>Email</th>
                            <th className='col'>Phone</th>
                            <th className='col'>Updata</th>
                            <th className='col'>Delete</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="tbl-content">
                <table border="0">
                    <tbody>

                        {
                            data.map((curEle, index) => (
                                <tr key={index}>
                                    <td scope="row" data-label='Name'>{curEle.username}</td>
                                    <td data-label='Email'>{curEle.email}</td>
                                    <td data-label='Phone'>{curEle.phone}</td>
                                    <td data-label='Updata'> <NavLink to={`/admin/users/edit/${curEle._id}`}> Edit </NavLink> </td>
                                    <td data-label='Delete'> <button onClick={() => deleteUser(curEle._id)}> Delete </button> </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </section>


    </>
} 
