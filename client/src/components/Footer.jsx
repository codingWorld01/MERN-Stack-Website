import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Footer.css'

export const Footer = () => {
  return <>
    <br /><br /><br /><br />
    <div className="footer">
      <div className="heading">
        {/* <h2>Faraz<sup>™</sup></h2> */}
      </div>
      <div className="content">
        <div className="services">
          <h4>Services</h4>
          <p><a href="#">App development</a></p>
          <p><a href="#">Web development</a></p>
          <p><a href="#">DevOps</a></p>
          <p><a href="#">Web designing</a></p>
        </div>
        <div className="social-media">
          <h4>Social</h4>
          <p>
            <a href="#"
            ><FontAwesomeIcon icon={['fab', 'linkedin']} /> Linkedin</a
            >
          </p>
          <p>
            <a href="#"
            ><FontAwesomeIcon icon={['fab', 'twitter']} /> Twitter</a
            >
          </p>
          <p>
            <a href="https://github.com/farazc60"
            ><FontAwesomeIcon icon={['fab', 'github']} /> Github</a
            >
          </p>
          <p>
            <a href="https://www.facebook.com/codewithfaraz"
            ><FontAwesomeIcon icon={['fab', 'facebook']} /> Facebook</a
            >
          </p>
          <p>
            <a href="https://www.instagram.com/codewithfaraz"
            ><FontAwesomeIcon icon={['fab', 'instagram']} /> Instagram</a
            >
          </p>
        </div>
        <div className="links">
          <h4>Quick links</h4>
          <p><a href="/home">Home</a></p>
          <p><a href="/about">About</a></p>
          <p><a href="/service">Service</a></p>
          <p><a href="/contact">Contact</a></p>
        </div>
        <div className="details">
          <h4 className="address">Address</h4>
          <p>
            Laxmi Nagar Behind  <br />
            New Cotton Market, Amravati
          </p>
          <h4 className="mobile">Mobile</h4>
          <p><a href="tel:8600777024">+91-12225*****</a></p>
          <h4 className="mail">Email</h4>
          <p><a href="mailto:yatharthaurangpure27@gmail.com">yatharthaurangpure27@gmail.com</a></p>
        </div>
      </div>
      <footer>
        <hr />
        © 2024 servicenow.
      </footer>
    </div>
  </>
}