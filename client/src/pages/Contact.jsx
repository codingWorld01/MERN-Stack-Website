import { useState, useEffect } from "react";
import '../style/Contact.css';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const defaultdata = {
  username: "",
  email: "",
  message: "",
}

export const Contact = () => {
  
    const API = "https://servicenow-backend.vercel.app";
  const [contact, setContact] = useState(defaultdata);
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (userData && user) {
      setContact({
        username: user.username,
        email: user.email,
        message: ""
      });
      setUserData(false);
    }
  }, [isLoggedIn, navigate, user, userData]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      });

      if (response.ok) {
        setContact(defaultdata);
        const data = await response.json();
        console.log(data);
        toast.success("Contact Form sent Successfully");
      } else {
        toast.error("Please Enter Correct Message");
      }

      navigate('/thanks')

    } catch (error) {
      console.log("Error Found in Contact Form ", error);
    }
  };

  return (
    <>
      <br />
      <br />
      <section className="section-registration">
        <div className="contact-content container">
          <div className="main-heading">Contact us</div>
        </div>
        <div className="container grid grid-two-cols">
          <div className="registration-image reg-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>
          <section className="registration-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
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
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>
              <div>
                <button type="submit" className="btn-wid">submit</button>
              </div>
            </form>
          </section>
        </div>
        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d713.8805623618314!2d77.75343385297845!3d20.946752996375345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6bcad25c888d3%3A0x7adfaf2b2e7901c8!2sHazrat%20Bilal%20Nagar%2C%20Amravati%2C%20Maharashtra%20444601!5e0!3m2!1sen!2sin!4v1720873899599!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};
