import { useState } from "react";
import { useAuth } from "../store/auth";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'

export const NewService = () => {

    const API = import.meta.env.VITE_APP_URI_API;
    const { token } = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState({
        image: '',
        provider: '',
        price: '',
        service: '',
        description: ''
    });
    const handleInput = (e) => {
        let value;
        if (e.target.files) {
            value = e.target.files[0];
        }
        else {
            value = e.target.value;
        }
        console.log(value);

        const name = e.target.name;

        setData({
            ...data,
            [name]: value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('provider', data.provider);
        formData.append('price', data.price);
        formData.append('service', data.service);
        formData.append('description', data.description);

        try {
            const response = await axios.post(`${API}/admin/services/new`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                toast.success("New Service Created");
                navigate('/admin/services');
            } else {
                toast.error("Service not Created");
            }
        } catch (error) {
            console.log("Error in addService ", error);
            toast.error("Service not Created");
        }
    };


    return <>
        <section className="section-registration">
            <div className="contact-content container">
                <div className="main-heading">New Service</div>
            </div>
            <div className="container grid grid-two-cols">
                <div className="registration-image">
                    <img src="/images/flat-customer-support-illustration.png" alt="we are always ready to help" />
                </div>
                <section className="registration-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="provider">Upload Image</label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                autoComplete="off"
                                onChange={handleInput}
                                required
                            />

                        </div>
                        <div>
                            <label htmlFor="provider">Provider</label>
                            <input
                                type="text"
                                name="provider"
                                id="provider"
                                autoComplete="off"
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
                                onChange={handleInput}
                                required
                            ></textarea>
                        </div>
                        <div className="space">
                            <div>
                                <button type="submit">Create Service</button>
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