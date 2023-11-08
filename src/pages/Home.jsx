import react from "react";
import { BoilerHome } from "./BoilerHome";
import { EntriesList } from "../components/EntriesList";

export function Home() {
  return (
    <div className="mx-auto max-w-screen-md py-12">
      <div className="home-stack">
        <div className="home-stack-alignment">
          <h1 className="entries-title">Entries</h1>
          <div className="entries">
            <EntriesList />
          </div>
        </div>
      </div>
    </div>
  );
}
