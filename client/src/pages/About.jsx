import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import '../style/About.css';
import { Analytics } from "../components/Analytics";

export const About = () => {

  useEffect(() => {
    const logoSlider = document.querySelector(".logo-slider");
    const logosSlide = document.querySelector(".logos-slide");

    if (logoSlider && logosSlide) {
      var copy = logosSlide.cloneNode(true);
      logoSlider.appendChild(copy);
    }
  }, []);  // Empty dependency array ensures this runs only once after the initial render

  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <h1>Why Choose Us?</h1>
              <p>
                Expertise: Our team consists of experienced IT professionals who
                are passionate about staying up-to-date with the latest industry
                trends.
              </p>
              <p>
                Customization: We understand that every business is unique.
                That's why we create solutions that are tailored to your specific
                needs and goals.
              </p>
              <p>
                Customer-Centric Approach: We prioritize your satisfaction and
                provide top-notch support to address your IT concerns.
              </p>
              <p>
                Affordability: We offer competitive pricing without compromising
                on the quality of our services.
              </p>
              <p>
                Reliability: Count on us to be there when you need us. We're
                committed to ensuring your IT environment is reliable and
                available 24/7.
              </p>
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn"> Connect Now</button>
                </NavLink>

                <NavLink to="/service">
                  <button className="btn secondary-btn">learn more</button>
                </NavLink>
              </div>
            </div>
            <div className="hero-image">
              <img
                src='../public/images/about.png'
                alt="coding buddies"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>

        <center>
          <h1>Our Clients</h1>
        </center >
        <br /> <br />
        <div>
          <div className="logo-slider">
            <div className="logos-slide">
              <img src="https://i.ibb.co/Vv5rkDK/api-partner-verzon.png" alt="Verizon" />
              <img src="https://i.ibb.co/J399KDg/api-partner-netflix.png" alt="Netflix" />
              <img src="https://i.ibb.co/TKT0F5L/api-partner-yelp.png" alt="Yelp" />
              <img src="https://i.ibb.co/HG6KR89/api-partner-adobe.png" alt="Adobe" />
              <img src="https://i.ibb.co/hMSJ1sg/api-partner-ring.png" alt="Ring" />
              <img src="https://i.ibb.co/4RWQcMS/api-partner-nespresso.png" alt="Nespresso" />
            </div>
          </div>
        </div>
      </main >
    </>
  );
};
