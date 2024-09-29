import { useEffect, useState } from "react"
import { useAuth } from "../store/auth";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const UpdateUser = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        phone: ''
    });

    const API = "https://servicenow-backend-api.vercel.app";
    const navigate = useNavigate();
    const { token } = useAuth();
    const params = useParams();

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        try {
            const response = await fetch(`${API}/admin/users/edit/${params.id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const result = await response.json();
                setData({
                    username: result.username,
                    email: result.email,
                    phone: result.phone,
                });
            }

        } catch (error) {
            console.log('UpdateUser ', error);
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`${API}/admin/users/update/${params.id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                toast.success("Updated Successfully !!");
            }
            else {
                toast.error("Not Updated !!");
            }

            navigate('/admin/users');
        }
        catch (e) {
            console.log("handlesubmit ", e);
        }
    }


    const handleInput = (e) => {
        const value = e.target.value;
        const key = e.target.name;

        setData({
            ...data,
            [key]: value
        });
    }

    return <>
        <section className="section-registration">
            <div className="contact-content container">
                <div className="main-heading">Update User Data</div>
            </div>
            <div className="container grid grid-two-cols">
                <div className="registration-image">
                    <img src="/images/Update.png" alt="we are always ready to help" />
                </div>
                <section className="registration-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="off"
                                value={data.username}
                                onChange={handleInput}
                                required
                            />

                        </div>

                        <div>
                            <label htmlFor="email">email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="off"
                                value={data.email}
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone">Mobile No</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                autoComplete="off"
                                value={data.phone}
                                onChange={handleInput}
                                required
                            ></input>
                        </div>
                        <div className="space">
                            <div>
                                <button type="submit">submit</button>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div>
                                <NavLink to='/admin/users'><button>Cancel</button></NavLink>
                            </div>
                        </div>
                    </form>
                </section>
            </div >
        </section >
    </>
}
