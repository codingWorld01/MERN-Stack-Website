import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContact = () => {
    const { token } = useAuth();
    const API = "https://servicenow-backend.vercel.app";

    const [data, setData] = useState([]);
    useEffect(() => {
        getAllContacts();
    }, []);

    const getAllContacts = async () => {
        try {
            const response = await fetch(`${API}/admin/contact`, {
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
            console.log('Error in getAllContacts ', error);
        }
    };

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`${API}/admin/contact/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                getAllContacts();
                toast.success("Contact Deleted Successfully");
            }
            else {
                toast.success("Contact Not Deleted");
            }
        } catch (error) {
            console.log("Error in deleteContact ", error);
        }
    }


    return <>
        <div className="contact-content container">
            <div className="main-heading">Contact Forms</div>
        </div>

        <section className='section'>

            <div className="tbl-header">
                <table className='tableData' cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                        <tr>
                            <th className='col'>Name</th>
                            <th className='col'>Email</th>
                            <th className='col'>Message</th>
                            <th className='col'>Delete</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="tbl-content">
                <table cellPadding="0" cellSpacing="0" border="0">
                    <tbody>

                        {
                            data.map((curEle, index) => (
                                <tr key={index}>
                                    <td scope="row" data-label='username'>{curEle.username}</td>
                                    <td data-label='email'>{curEle.email}</td>
                                    <td data-label='message'>{curEle.message}</td>
                                    <td data-label='delete'> <button onClick={() => deleteContact(curEle._id)}> Delete </button> </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </section>
    </>
} 
