import { react, useState, useRef } from "react";
import { auth, db } from "../firebase.js";
import { doc, setDoc } from "firebase/firestore";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import { pipeline, env } from "@xenova/transformers";

env.allowLocalModels = false;
env.useBrowserCache = false;

export function NewEntry(props) {
  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const formattedTime = now.toLocaleTimeString();
  const formattedDateAndTime = formattedDate + " " + formattedTime;

  const [entryTitle, setEntryTitle] = useState("");
  const [entryContent, setEntryContent] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading status

  function create_UUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;
    const newEntryID = create_UUID();

    // Perform sentiment analysis on the entry content
    setLoading(true); // Set loading to true when starting the analysis
    const pipe = await pipeline("sentiment-analysis");
    const out = await pipe(entryContent);
    setLoading(false); // Set loading to false when analysis is done

    await setDoc(doc(db, currentUser.uid, newEntryID), {
      content: entryContent,
      timestamp: formattedDateAndTime,
      userID: currentUser.uid,
      creationDate: formattedDateAndTime,
      editedDate: formattedDateAndTime,
      title: entryTitle ?? formattedDateAndTime,
      entryID: newEntryID,
      sentiment: {
        score: out[0].score,
        label: out[0].label,
      },
    });

    setEntryTitle("");
    setEntryContent("");
  };
  return (
    <div className="forms new-entry-container">
      <div className="forms-new-entry">
        <div className="form-box signup-box">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              {formattedDate}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              {formattedTime}
            </Typography>
            <form className="new-entry-box" onSubmit={handleSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Title (Optional)
                </Typography>
                <Input
                  size="lg"
                  placeholder="The Day I Conquered the Universe"
                  value={entryTitle}
                  onChange={(e) => setEntryTitle(e.target.value)}
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
                  value={entryContent}
                  onChange={(e) => setEntryContent(e.target.value)}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Button
                className="mt-6 new-entry-save-button"
                type="submit"
                fullWidth
              >
                {loading ? ( 
                <div className="btn-spinner">
                  <Spinner />
                </div>
                ) : (
                  "Save" // Show "Save" text when loading is false
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
