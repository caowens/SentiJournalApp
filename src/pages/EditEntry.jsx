import { react, useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase.js";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { pipeline, env } from "@xenova/transformers";

env.allowLocalModels = false;
env.useBrowserCache = false;

export function EditEntry(props) {
  // Access the parameters
  const { userID, entryID } = useParams();

  const modal = useRef(null);

  const retrieveEntry = async () => {
    const docRef = doc(db, userID, entryID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  };

  const [entry, setEntry] = useState(null);
  const [entryTitle, setEntryTitle] = useState("");
  const [entryContent, setEntryContent] = useState("");

  useEffect(() => {
    // Call the retrieveEntry function and set the state
    const fetchData = async () => {
      const entryData = await retrieveEntry();
      setEntry(entryData);

      // Set the initial values for entryTitle and entryContent
      setEntryTitle(entryData.title || ""); // Use empty string if title is undefined
      setEntryContent(entryData.content || ""); // Use empty string if content is undefined
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [userID, entryID]); // Add userID and entryID as dependencies for useEffect

  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const formattedTime = now.toLocaleTimeString();
  const formattedDateAndTime = formattedDate + " " + formattedTime;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform sentiment analysis on the entry content
    modal.current.classList.toggle("hidden");
    const pipe = await pipeline("sentiment-analysis");
    const out = await pipe(entryContent);
    modal.current.classList.toggle("hidden");

    const docRef = doc(db, userID, entryID);

    await updateDoc(docRef, {
      content: entryContent,
      editedDate: formattedDateAndTime,
      title: entryTitle || formattedDateAndTime,
      sentiment: {
        score: out[0].score,
        label: out[0].label,
      },
    });

    setEntryTitle("");
    setEntryContent("");
  };
  return (
    <div>
      {entry !== null ? (
        <>
          <div className="forms new-entry-container">
            <div className="forms-new-entry">
              <div className="form-box signup-box">
                <Card color="transparent" shadow={false}>
                  <Typography variant="h4" color="blue-gray">
                    {entry.title}
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    {formattedTime}
                  </Typography>
                  <form className="new-entry-box" onSubmit={handleSubmit}>
                    <div className="mb-1 flex flex-col gap-6">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Title (Optional)
                      </Typography>
                      <Input
                        size="lg"
                        type="text"
                        value={entryTitle}
                        onChange={(e) => setEntryTitle(e.target.value)}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Entry
                      </Typography>
                      <div
                        ref={modal}
                        className="mod absolute hidden rounded-lg border-[2px] border-solid border-black/60 bg-white p-16 text-5xl"
                      >
                        Please wait...
                      </div>
                      <Textarea
                        size="lg"
                        rows={10}
                        value={entryContent}
                        onChange={(e) => setEntryContent(e.target.value)}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    <Button className="mt-6 new-entry-save-button" type="submit" fullWidth>
                      Update
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
          <svg
            class="w-12 h-12 text-gray-300 animate-spin"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path
              d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
              stroke="currentColor"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
              stroke="currentColor"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-gray-900"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
}
