import react from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";

export function SimpleRegistrationForm(props) {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const logoutUser = async (e) => {
    e.preventDefault();

    await signOut(auth);
    navigate("/");
  };

  return (
    <div className={props}>
      <div className="form-box signup-box">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            My Profile
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            You are logged in. Here is your profile information.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                email: {user.email}
              </Typography>
            </div>
            <Link to="/">
              <Button
                className="mt-6"
                color="red"
                type="submit"
                onClick={(e) => logoutUser(e)}
                fullWidth
              >
                logout
              </Button>
            </Link>
          </form>
        </Card>
      </div>
    </div>
  );
}

export function Profile() {
  return (
    <div className="forms">
      <SimpleRegistrationForm props="forms" />
    </div>
  );
}
