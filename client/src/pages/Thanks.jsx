import { NavLink } from "react-router-dom";

export const Thanks = () => {
    return (
        <>
            <br />
            <br />
            <section id="error-page">
                <div className=" content">
                    <h2 className="header smaller">THANKS!</h2>
                    <h4>Thank you for contacting us!</h4>
                    <p>
                    We have successfully received your message, and our team is already on it! We truly value the time you took to reach out to us, and we're committed to providing you with the best possible assistance. You can rest assured that one of our dedicated team members will review your inquiry and get back to you as soon as possible. We appreciate your patience and look forward to connecting with you shortly. If your matter is urgent, please don't hesitate to contact us directly through our phone line or support email.
                    </p>
                    <div className="btns">
                        <NavLink to="/">return home</NavLink>
                        <NavLink to="/about">See More</NavLink>
                    </div>
                </div>
            </section>
        </>
    );
};