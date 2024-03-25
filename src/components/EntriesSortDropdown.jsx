import { Select, Option } from "@material-tailwind/react";

export function EntriesSortDropdown() {
  return (
    <>
      <Select color="cyan" label="Sort" className="bg-w">
        <Option>Newest</Option>
        <Option>Oldest</Option>
        <Option>Negative First</Option>
        <Option>Positive First</Option>
      </Select>
    </>
  );
}
