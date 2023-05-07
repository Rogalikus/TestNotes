import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
} from "./components/api.js/api";

function App() {
  const [notes, setNotes] = useState([]);

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

  const handleUpdateNote = (id, title, content) => {
    updateNote({ id, title, content });
    getNotes((notes) => {
      setNotes(notes);
    });
  };

  const handleDeleteNote = (id) => {
    deleteNote(id);
    getNotes((notes) => {
      setNotes(notes);
    });
  };

  return (
    <div className="App">
      <Header addNote={addNote} setNotes={setNotes} getNotes={getNotes} />
      <div className="MainContent">
        <div className="noteList">
          {notes.map((note) => (
            <div key={note.id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
            </div>
          ))}
        </div>
        <div className="content">
          <textarea className="contentText"></textarea>
        </div>
      </div>
      {/* <form>
        <input name="title" placeholder="Title" />
        <textarea name="content" placeholder="Content" />
        <button type="submit">Add Note</button>
      </form> */}
    </div>
  );
}

export default App;
