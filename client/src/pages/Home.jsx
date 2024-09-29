
import { useState } from 'react';
import '../style/Home.css'
import { useAuth } from '../store/auth';
import { Analytics } from '../components/Analytics';

export const Home = () => {

  const [name, setName] = useState('');
  const { user } = useAuth();

  const [userData, setUserData] = useState(true);

  if (userData && user) {
    setName(user.username);

    setUserData(false);
  }

  return (

    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Hii {name}!!</p>
              <h1>Welcome to ServiceNow</h1>
              <p>
                Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At Yatharth Technical,
                we specialize in providing innovative IT services and solutions
                tailored to meet your unique needs.
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/service">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>

            <div className="hero-image">
              <img
                src="../public/images/home.png"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      <Analytics/>

      <section className="section-hero">
        <div className="container grid grid-two-cols">
          <div className="hero-image">
            <img
              src="../public/images/ai.png"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>

          <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              let's discuss how Thapa Technical can help your business thrive in
              the digital age.
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
              <a href="/service">
                <button className="btn secondary-btn">learn more</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
