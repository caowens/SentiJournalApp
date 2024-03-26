import { EntriesList } from "../components/EntriesList";
import { Typography, Select, Option } from "@material-tailwind/react";
import { useState } from "react";

export function Home() {
  let [option, setOption] = useState("Newest");
  const handleChange = (e) => {
    setOption(e);
  };
  return (
    <div className="mx-auto max-w-screen-md py-12">
      <div className="home-stack w-full">
        <div className="home-stack-alignment w-full">
          <div className="home-header">
            <Typography variant="h3" className="entries-title">
              Entries
            </Typography>
            <div className="home-entries-dropdown">
              <Select
                color="cyan"
                label="Sort"
                className="bg-w"
                id="dropdown-select"
                onChange={handleChange}
              >
                <Option value="Newest">Newest</Option>
                <Option value="Oldest">Oldest</Option>
                <Option value="NegativeFirst">Negative First</Option>
                <Option value="PositiveFirst">Positive First</Option>
              </Select>
            </div>
          </div>
          <hr></hr>
          <div className="entries">
            <EntriesList key={option} sortOption={option} />
          </div>
        </div>
      </div>
    </div>
  );
}
