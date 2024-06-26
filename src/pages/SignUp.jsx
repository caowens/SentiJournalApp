import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import SJLogo from "../images/SJLogo.svg";

export function SimpleRegistrationForm(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notice, setNotice] = useState("");
  const form = useRef();

  const signupWithUsernameAndPassword = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        // Send user welcome email
        emailjs
          .sendForm("service_skaio3a", "template_4eyy7jy", form.current, {
            publicKey: "FNfPkpKBFyceLaDUh",
          })
          .then(
            (result) => {
              console.log(result.text);
              console.log("Message sent!");
            },
            (error) => {
              console.log("Message FAILED...", error.text);
            }
          );
        
        // navigate to entries list with user credentials
        const currentUser = auth.currentUser;
        navigate("/signedin/" + currentUser.uid);
      } catch {
        setNotice("Sorry, something went wrong. Please try again.");
      }
    } else {
      setNotice("Passwords don't match. Please try again.");
    }
  };

  return (
    <div className={props}>
      <div className="form-box signup-box">
        <Card color="transparent" shadow={false}>
          <a href="/">
            <div className="login-logo-container">
              <div className="header-logo-container">
                <img
                  className="login-logo filter-white"
                  src={SJLogo}
                  alt="SentiJournal Logo"
                />
              </div>
            </div>
          </a>
          <Typography color="gray" className="mt-1 font-normal">
            {"" !== notice && <Alert color="red">{notice}</Alert>}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="text-center">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-center">
            Nice to meet you! Enter your details to register.
          </Typography>
          <form ref={form} className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                type="email"
                id="signupEmail"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="user_email"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                id="signupPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Confirm Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button
              className="mt-6"
              type="submit"
              onClick={(e) => signupWithUsernameAndPassword(e)}
              fullWidth
            >
              sign up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-gray-900">
                <Link to="/login">Log In</Link>
              </a>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}

export function SignUp() {
  return (
    <div className="forms forms-signup">
      <SimpleRegistrationForm props="forms" />
    </div>
  );
}
