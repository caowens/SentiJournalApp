import { Outlet } from "react-router-dom";
import { ComplexNavbar } from "../components/ComplexNavbar";

export default function Root() {
  return (
    <>
      <ComplexNavbar />
      <Outlet />
    </>
  );
}
