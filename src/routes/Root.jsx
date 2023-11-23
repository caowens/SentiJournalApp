import { Navbar } from "@material-tailwind/react";
import { Outlet } from "react-router-dom";
import { BoilerHome } from "../pages/BoilerHome";
import { Home } from "../pages/Home";
import { StickyNavbar } from "../components/Navbar";
import { ComplexNavbar } from "../components/ComplexNavbar";

export default function Root() {
  return (
    <>
      <ComplexNavbar />
      <Outlet />
    </>
  );
}
