import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
} from "./components/api.js/api";
import { MainPage } from "./components/MainPage";

export const AppContext = createContext();

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState();

  useEffect(() => {
    const request = indexedDB.open("notesDB", 1);

    request.onerror = (event) => {
      console.error(`Database error: ${event.target.error}`);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const store = db.createObjectStore("notesStore", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("title", "title", { unique: false });
      store.createIndex("content", "content", { unique: false });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("notesStore", "readonly");
      const store = transaction.objectStore("notesStore");
      const getRequest = store.getAll();

      getRequest.onsuccess = (event) => {
        const notes = event.target.result;
        setNotes(notes);
      };

      getRequest.onerror = (event) => {
        console.error(`Error getting notes: ${event.target.error}`);
        setNotes([]);
      };
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        notes,
        addNote,
        setNotes,
        getNotes,
        selectedNote,
        deleteNote,
        updateNote,
        setSelectedNote,
      }}
      notes={notes}
      addNote={addNote}
      setNotes={setNotes}
      getNotes={getNotes}
      selectedNote={selectedNote}
      deleteNote={deleteNote}
      updateNote={updateNote}
      setSelectedNote={setSelectedNote}
    >
      <MainPage />
    </AppContext.Provider>
  );
}

export default App;
