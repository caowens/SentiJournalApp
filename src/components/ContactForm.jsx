import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
 
export function ContactForm() {
  return (
     <Card color="white" shadow={false}>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 contact-form">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Name
          </Typography>
          <Input
            size="lg"
            placeholder="John Doe"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Message
          </Typography>
          <Textarea label="Message" />
        </div>
        <Button className="mt-6" fullWidth>
          Submit
        </Button>
      </form>
    </Card>
  );
}