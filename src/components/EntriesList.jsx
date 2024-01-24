import { react, useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { Link } from "react-router-dom";

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

function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const fetchJournalEntries = async () => {
  const currentUser = auth.currentUser;
  const q = query(
    collection(db, currentUser.uid),
    where("entryID", "!=", null)
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
      userID: doc.data().userID,
      entryID: doc.data().entryID,
      sentiment: doc.data().sentiment,
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

const JournalEntry = ({
  title,
  editedDate,
  id,
  userID,
  sentiment,
  setJournalEntries,
}) => {
  const handleDelete = async () => {
    await deleteDoc(doc(db, userID, id));

    // Refetch journal entries and update state
    const newJournalEntries = await fetchJournalEntries();
    setJournalEntries(newJournalEntries);
  };
  const handleEdit = async () => {
    const docRef = doc(db, userID, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  const getColor = () => {
    if (sentiment === 1) {
      return "green";
    } else if (sentiment === -1) {
      return "red";
    } else {
      return "#555";
    }
  };
  return (
    <ListItem ripple={false} className="py-1 pr-1 pl-4 journal-entry-in-list">
      {title}
      <ListItemSuffix>
        <Chip
          value={editedDate}
          variant="ghost"
          size="sm"
          className="rounded-full"
        />
      </ListItemSuffix>
      <ListItemSuffix>
        <div
          className="square"
          style={{
            backgroundColor: getColor(),
          }}
        ></div>
      </ListItemSuffix>
      <ListItemSuffix>
        <Link to={"/signedin/edit/" + userID + "/" + id}>
          <IconButton variant="text" color="blue-gray">
            <EditIcon />
          </IconButton>
        </Link>
      </ListItemSuffix>
      <ListItemSuffix>
        <IconButton onClick={handleDelete} variant="text" color="blue-gray">
          <TrashIcon />
        </IconButton>
      </ListItemSuffix>
    </ListItem>
  );
};

export function EntriesList() {
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
          <JournalEntry
            key={entry.id}
            title={entry.title}
            editedDate={entry.editedDate}
            userID={entry.userID}
            id={entry.id}
            sentiment={entry.sentiment}
            setJournalEntries={setJournalEntries} // Pass setJournalEntries as a prop
          />
        ))}
      </List>
    </Card>
  );
}
