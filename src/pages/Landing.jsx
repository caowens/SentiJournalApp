import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export function Landing() {
  return (
    <>
      <div className="landing">
        <div className="header">
          SentiJournal
          <ul className="header-links">
            <li className="about-us">
              <a href="">About Us</a>
            </li>
            <li className="contact">
              <a href="">Contact</a>
            </li>
          </ul>
          <ul className="header-buttons">
            <Button variant="outlined" className="header-login">
              <Link to={"/login"}>Log in</Link>
            </Button>
            <Button className="header-signup">
              <Link to={"/signup"}>Sign Up</Link>
            </Button>
          </ul>
        </div>

        <div className="main-section section">
          <div className="intro">
            <div className="hero-main">
              Discover your emotions with <br></br>{" "}
              <h1 className="hero-main-title">SentiJournal</h1>
            </div>
            <div className="hero-secondary">
              SentiJournal uses advanced sentiment analysis to track and
              visualize your emotional journey through journaling. Gain insights
              into your feelings and see how they evolve over time.
            </div>
            <div className="get-started-section">
              <Button className="get-started-btn">Get Started</Button>
              <Button variant="outlined" className="learn-more-btn">
                <a href="">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
