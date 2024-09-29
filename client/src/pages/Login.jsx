import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import '../style/Contact.css'

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

    const API = "https://servicenow-backend.vercel.app";
  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.tocken);
        setUser({ email: '', password: '' });
        toast.success("Login Successful");
        navigate('/');
      }
      else {
        console.log(res_data)
        toast.error(res_data.extradetails ? res_data.extradetails : res_data.message);
      }

    } catch (error) {
      console.log('Error in Login ', error);
    }
  }


  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container">
              <div className="main-heading">Login Page</div>
            </div>
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/login.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">

                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <div className="test">
                    Have not account yet? <NavLink to={'/register'} >create account</NavLink>
                  </div>
                  <button type="submit" className="btn btn-wid">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
