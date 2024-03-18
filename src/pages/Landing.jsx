import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import homeScreen from "../images/newHomeScreenshot.png";

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

        <div className="discover-section section">
          <div className="discover-intro">
            <div className="discover-main">
              Uncover the <span className="emotions">emotions</span> in{" "}
              <br></br> your journal entries
            </div>
            <div className="discover-secondary">
              SentiJournal utilizes advanced sentiment analysis models to
              categorize and score the emotions expressed in your journal
              entries. SentiJournal enhances your journaling experience by
              displaying a snapshot of the emotional tone next to each entry in
              your list, giving you instant insight into the sentiments captured
              in your journaling journey.
            </div>
          </div>
          <img src={homeScreen} alt="Home Page with Entries List" />
        </div>
      </div>
    </>
  );
}
