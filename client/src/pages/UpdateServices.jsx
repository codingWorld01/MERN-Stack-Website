import { useEffect, useState } from "react"
import { useAuth } from "../store/auth";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const UpdateServices = () => {
    const [data, setData] = useState({
        provider: '',
        price: '',
        service: '',
        description: ''
    });

    const navigate = useNavigate();
    const { token } = useAuth();
    const API = import.meta.env.VITE_APP_URI_API;
    const params = useParams();

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        try {

            const response = await fetch(`${API}/admin/services/edit/${params.id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            if (response.ok) {
                const result = await response.json();
                setData({
                    provider: result.provider,
                    price: result.price,
                    service: result.service,
                    description: result.description,
                });
            }

        } catch (error) {
            console.log('UpdateServices ', error);
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`${API}/admin/services/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(data)
            });

            console.log(response);

            if (response.ok) {
                toast.success("Service Updated Successfully");
            }
            else {
                toast.error("Data not Updated");
            }

            navigate('/admin/services');

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
                <div className="main-heading">Update Service Data</div>
            </div>
            <div className="container grid grid-two-cols">
                <div className="registration-image">
                    <img src="/images/Update.png" alt="we are always ready to help" />
                </div>
                <section className="registration-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="provider">Provider</label>
                            <input
                                type="text"
                                name="provider"
                                id="provider"
                                autoComplete="off"
                                value={data.provider}
                                onChange={handleInput}
                                required
                            />

                        </div>

                        <div>
                            <label htmlFor="price">Price</label>
                            <input
                                type="price"
                                name="price"
                                id="price"
                                autoComplete="off"
                                value={data.price}
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="service">Service</label>
                            <input
                                type="text"
                                name="service"
                                id="service"
                                autoComplete="off"
                                value={data.service}
                                onChange={handleInput}
                                required
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                autoComplete="off"
                                value={data.description}
                                onChange={handleInput}
                                required
                            ></textarea>
                        </div>
                        <div className="space">
                            <div>
                                <button type="submit">Update</button>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div>
                                <NavLink to='/admin/services'><button>Cancel</button></NavLink>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </section>
    </>
}