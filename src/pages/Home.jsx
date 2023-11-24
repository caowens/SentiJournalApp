import react from "react";
import { BoilerHome } from "./BoilerHome";
import { EntriesList } from "../components/EntriesList";
import { Typography } from "@material-tailwind/react";

export function Home() {
  return (
    <div className="mx-auto max-w-screen-md py-12">
      <div className="home-stack">
        <div className="home-stack-alignment">
        <Typography variant="h3" className="entries-title">Entries</Typography>
          <hr></hr>
          <div className="entries">
            <EntriesList />
          </div>
        </div>
      </div>
    </div>
  );
}
