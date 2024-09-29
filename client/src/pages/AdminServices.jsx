import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AdminServices = () => {

    const API = "https://servicenow-backend-api.vercel.app";
    const { token } = useAuth();
    const [data, setData] = useState([])
    useEffect(() => {
        getAllServices();
    }, []);


    const getAllServices = async () => {
        try {
            const response = await fetch(`${API}/admin/services`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setData(data);
            }

        } catch (error) {
            console.log("Error in getAllServices ", error);
        }
    }

    const deleteService = async (id) => {
        try {
            const response = await fetch(`${API}/admin/services/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.ok) {
                getAllServices();
                toast.success("Service Deleted Successfully");
            }
            else {
                toast.error("Service can't Delete !!");
            }
        } catch (error) {
            console.log(`Error in deleteService `, error);
        }
    }

    return <>
        <div className="contact-content container">
            <div className="main-heading">Admin Services</div>
        </div>
        <div className="add-service">
            <NavLink to={'/admin/services/add'}><button>
                <svg className="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg> Add New Service</button>
            </NavLink>
        </div>
        <br />
        <section className='section'>
            <div className="tbl-header">
                <table className='tableData' cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                        <tr>
                            <th className='col'>Provider</th>
                            <th className='col'>Price</th>
                            <th className='col'>Service</th>
                            <th className='col'>Description</th>
                            <th className='col'>Update</th>
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
                                    <td scope="row" data-label='provider'>{curEle.provider}</td>
                                    <td data-label='price'>{curEle.price}</td>
                                    <td data-label='service'>{curEle.service}</td>
                                    <td data-label='description'>{curEle.description}</td>
                                    <td data-label='edit'> <NavLink to={`/admin/services/edit/${curEle._id}`}>Edit</NavLink>  </td>
                                    <td data-label='delete'> <button onClick={() => deleteService(curEle._id)}> Delete </button> </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </section>
    </>
}
