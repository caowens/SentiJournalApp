import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export function Landing() {
  return (
    <>
      <div className="landing">
        <div className="header">
          SentiJournal
          <ul className="header-links">
            <li className="about-us"><a href="">About Us</a></li>
            <li className="contact"><a href="">Contact</a></li>
          </ul>
          <ul className="header-buttons">
            <Button variant="outlined" className="header-login"><Link to={"/login"}>Log in</Link></Button>
            <Button className="header-signup"><Link to={"/signup"}>Sign Up</Link></Button>
          </ul>
        </div>
      </div>
    </>
  );
}
