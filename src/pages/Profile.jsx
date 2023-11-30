import react from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SimpleRegistrationForm(props) {
  return (
    <div className={props}>
      <div className="form-box signup-box">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            My Profile
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Here is your profile information.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                fakeEmail@fake.com
              </Typography>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
            </div>
            <Link to="/">
                <Button className="mt-6" color="red" fullWidth>
                    sign out
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
