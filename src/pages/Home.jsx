import { EntriesList } from "../components/EntriesList";
import { Typography } from "@material-tailwind/react";
import { EntriesSortDropdown } from "../components/EntriesSortDropdown";

export function Home() {
  return (
    <div className="mx-auto max-w-screen-md py-12">
      <div className="home-stack w-full">
        <div className="home-stack-alignment w-full">
          <div className="home-header">
            <Typography variant="h3" className="entries-title">
              Entries
            </Typography>
            <div className="home-entries-dropdown">
              <EntriesSortDropdown className="entries-sort-dropdown" />
            </div>
          </div>
          <hr></hr>
          <div className="entries">
            <EntriesList />
          </div>
        </div>
      </div>
    </div>
  );
}
