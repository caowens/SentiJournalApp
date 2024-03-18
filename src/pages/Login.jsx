import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export function SimpleRegistrationForm(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");

  const loginWithUsernameAndPassword = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      navigate("/signedin/" + currentUser.uid);
    } catch {
      setNotice("You entered a wrong username or password.");
    }
  };
  return (
    <div className={props}>
      <div className="form-box signup-box">
        <Card color="transparent" shadow={false}>
          <Typography color="gray" className="mt-1 font-normal">
            {"" !== notice && <Alert color="red">{notice}</Alert>}
          </Typography>
          <Typography variant="h4" color="blue-gray">
            Login
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Welcome back! Enter your details to log in.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                size="lg"
                type="email"
                placeholder="name@mail.com"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Link to="/signedin">
              <Button
                className="mt-6"
                type="submit"
                onClick={(e) => loginWithUsernameAndPassword(e)}
                fullWidth
              >
                log in
              </Button>
            </Link>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Need to create an account?{" "}
              <a href="#" className="font-medium text-gray-900">
                <Link to="./signup">Sign Up</Link>
              </a>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}

export function Login() {
  return (
    <div className="forms">
      <SimpleRegistrationForm props="forms" />
    </div>
  );
}
