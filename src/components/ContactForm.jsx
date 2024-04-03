import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_skaio3a", "template_nehb5cb", form.current, {
        publicKey: "FNfPkpKBFyceLaDUh",
      })
      .then(
        (result) => {
          console.log(result.text);
          console.log("Message sent!");
          setEmail("");
          setName("");
          setMessage("");
          e.target.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <Card color="white" shadow={false}>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 contact-form"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Name
          </Typography>
          <Input
            size="lg"
            placeholder="John Doe"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            name="user_name"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="user_email"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Message
          </Typography>
          <Textarea
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
          />
        </div>
        <Button className="mt-6" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Card>
  );
}
