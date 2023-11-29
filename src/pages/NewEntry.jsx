import react from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";

export function NewEntry(props) {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
  return (
    <div className="forms">
        <div className="forms-new-entry">
            <div className="form-box signup-box">
                <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    {formattedDate}
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    {formattedTime}
                </Typography>
                <form className="new-entry-box">
                    <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Title (Optional)
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="The Day I Conquered the Universe"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Entry
                    </Typography>
                    <Textarea
                        size="lg"
                        placeholder="Today was a great day..."
                        rows={10}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    </div>
                    <Button className="mt-6" fullWidth>
                    Save
                    </Button>
                </form>
                </Card>
            </div>
        </div>
    </div>
  );
}
