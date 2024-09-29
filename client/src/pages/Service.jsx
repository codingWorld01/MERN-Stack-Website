import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import '../style/Service.css';

export const Service = () => {
  const { services } = useAuth();
  const navigate = useNavigate();
     const API = "https://servicenow-backend-api.vercel.app";

  return <>
    <br />
    <br />
    <br />

    <section className="section-services">
      <div className="container">
        <div className="main-heading">Services</div>
      </div>
      <br /><br />
      <div className="container grid grid-three-cols">
        {
          services.map((curElem, index) => {
            return (
              <div className="card" key={index}>
                <div className="card-img">
                  <img src={`${API}/Images/${curElem.image}`} alt="designer" width="200" height='200' />
                </div>
                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{curElem.provider}</p>
                    <p>{curElem.price}</p>
                  </div>
                  <h2>{curElem.service}</h2>
                  <p>{curElem.description}</p>

                </div>
                <div className="merged">
                  <button className="full" onClick={() => navigate('/contact')}>Join Now</button>
                  <button className="secondary-btn full" onClick={() => navigate('/about')}>See More</button>
                </div>
              </div>
            );
          })
        }
      </div>
    </section>
  </>
};
