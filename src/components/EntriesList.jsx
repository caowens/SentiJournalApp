import { react, useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase.js";

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const fetchJournalEntries = async () => {
  const currentUser = auth.currentUser;
  const q = query(
    collection(db, "journals"),
    where("userId", "==", currentUser.uid)
  );
  const querySnapshot = await getDocs(q);

  const journalEntries = [];
  querySnapshot.forEach((doc) => {
    const data = {
      id: doc.id,
      title: doc.data().title,
      content: doc.data().content,
      timestamp: doc.data().timestamp,
      creationDate: doc.data().creationDate,
      editedDate: doc.data().editedDate,
    };
    journalEntries.push(data);
  });

  return journalEntries;
};

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

const JournalEntry = ({ title, timestamp }) => {
  return (
    <ListItem ripple={false} className="py-1 pr-1 pl-4">
      {title}
      <ListItemSuffix>
        <Chip
          value={timestamp}
          variant="ghost"
          size="sm"
          className="rounded-full"
        />
      </ListItemSuffix>
      <ListItemSuffix>
        <div className="square"></div>
      </ListItemSuffix>
      <ListItemSuffix>
        <IconButton variant="text" color="blue-gray">
          <TrashIcon />
        </IconButton>
      </ListItemSuffix>
    </ListItem>
  );
};

export function EntriesList() {
  // const [entryQuery, setEntryQuery] = useState();
  // const journalEntries = [];

  // const handleSubmit = async () => {

  //   const currentUser = auth.currentUser;
  //   const newJournalID = create_UUID();
  //   const q = query(collection(db, "journals"), where("userId", "==", currentUser.uid));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     // setEntryQuery(doc.data());
  //     coll.push(entryQuery);
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // };
  // handleSubmit();
  // console.log(coll)
  const [journalEntries, setJournalEntries] = useState([]);
  useEffect(() => {
    const fetchEntries = async () => {
      const entries = await fetchJournalEntries();
      setJournalEntries(entries);
    };
    fetchEntries();
  }, []);

  return (
    <Card className="w-full">
      <List>
        {journalEntries.map((entry) => (
          <JournalEntry key={entry.id} title={entry.title} timestamp={entry.timestamp} />
        ))}
        {/* <ListItem ripple={false} className="py-1 pr-1 pl-4">
          Entry One
          <ListItemSuffix>
            <Chip
              value="11/22/2023"
              variant="ghost"
              size="sm"
              className="rounded-full"
            />
          </ListItemSuffix>
          <ListItemSuffix>
            <div className="square"></div>
          </ListItemSuffix>
          <ListItemSuffix>
            <IconButton variant="text" color="blue-gray">
              <TrashIcon />
            </IconButton>
          </ListItemSuffix>
        </ListItem>
        <ListItem ripple={false} className="py-1 pr-1 pl-4">
          Entry Two
          <ListItemSuffix>
            <Chip
              value="11/22/2023"
              variant="ghost"
              size="sm"
              className="rounded-full"
            />
          </ListItemSuffix>
          <ListItemSuffix>
            <div className="square"></div>
          </ListItemSuffix>
          <ListItemSuffix>
            <IconButton variant="text" color="blue-gray">
              <TrashIcon />
            </IconButton>
          </ListItemSuffix>
        </ListItem>
        <ListItem ripple={false} className="py-1 pr-1 pl-4">
          Entry Three
          <ListItemSuffix>
            <Chip
              value="11/22/2023"
              variant="ghost"
              size="sm"
              className="rounded-full"
            />
          </ListItemSuffix>
          <ListItemSuffix>
            <div className="square"></div>
          </ListItemSuffix>
          <ListItemSuffix>
            <IconButton variant="text" color="blue-gray">
              <TrashIcon />
            </IconButton>
          </ListItemSuffix>
        </ListItem> */}
      </List>
    </Card>
  );
}
