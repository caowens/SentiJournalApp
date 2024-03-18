import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
export function FAQAccordion(props) {
  const [open, setOpen] = React.useState(1);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
      <Accordion open={open === 0} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className={`border-b-0 transition-colors ${
            open === 1 ? "" : "text-blue-500 hover:!text-blue-700"
          }`}
        >
          {props.header}
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
          {props.description}
        </AccordionBody>
      </Accordion>
    </>
  );
}