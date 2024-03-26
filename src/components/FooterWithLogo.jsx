import { Typography } from "@material-tailwind/react";
import SJLogo from "../images/SJLogo.svg";

export function FooterWithLogo() {
  return (
    <footer className="w-full bg-black p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-black text-center md:justify-between">
        <div className="header-logo-container">
          <img
            className="header-logo-landing filter-white"
            src={SJLogo}
            alt="SentiJournal Logo"
          />
        </div>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="https://github.com/caowens/SentiJournalApp?tab=readme-ov-file#contributing"
              target="_blank"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#faq-section"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              FAQs
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#contact-section"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="white" className="text-center font-normal">
        &copy; 2024 SentiJournal
      </Typography>
    </footer>
  );
}
