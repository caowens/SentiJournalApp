import { react, useState, useEffect } from "react";
import { auth, db } from "../firebase.js";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Sentiment from 'sentiment';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";

export function EditEntry(props) {
  // Access the parameters
  const { userID, entryID } = useParams();

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
  const sentiment = new Sentiment();

  const sentimentAnalysis = (text) => {
    const tempResult = sentiment.analyze(text);
    return tempResult;
  };

  const createSentimentLabel = (score) => {
      if (score > 1) {
          return 'POSITIVE';
      }
      else if (score < -1) {
          return 'NEGATIVE';
      }
      else {
          return 'NEUTRAL';
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform sentiment analysis on the entry content
    const analysis  = sentimentAnalysis(entryContent);
    const label = createSentimentLabel(analysis.score);

    const docRef = doc(db, userID, entryID);

    await updateDoc(docRef, {
      content: entryContent,
      editedDate: formattedDateAndTime,
      title: entryTitle || formattedDateAndTime,
      sentiment: {
        score: analysis?.score,
        label: label 
    },
    });

    setEntryTitle("");
    setEntryContent("");
  };
  return (
    <div>
      {entry !== null ? (
        <>
          <div className="forms">
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
                    <Button className="mt-6" type="submit" fullWidth>
                      Update
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
