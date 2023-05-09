import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "./Header";
import { AppContext } from "../App";
import debounce from "lodash.debounce";
import "../App.css";
import { ListItem } from "./ListItem";

export const MainPage = () => {
  const { notes, selectedNote, updateNote, getNotes, setNotes } =
    useContext(AppContext);

  const editRef = useRef(null);
  const [canEdit, setCanEdit] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (selectedNote) {
      const note = notes.find((note) => note.id === selectedNote);
      document.querySelector(".contentText").value = note.content;
    }
  }, [selectedNote, notes]);

  const handleUpdateNote = (id, title, content) => {
    updateNote({ id, title, content });
    getNotes((notes) => {
      setNotes(notes);
    });
  };
  const findNote = notes.find((el) => el.id === selectedNote);

  return (
    <div className="App">
      <Header
        setCanEdit={setCanEdit}
        editRef={editRef}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      <div className="MainContent">
        <div className="noteList">
          {notes
            .filter((el) => {
              if (
                el.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                el.content.toLowerCase().includes(searchValue.toLowerCase())
              ) {
                return true;
              }
              return false;
            })
            .map((note) => (
              <ListItem
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
              />
            ))}
        </div>
        {selectedNote && (
          <div ref={editRef} className="content">
            <textarea className="contentDate" readOnly>
              {Date.now()}
            </textarea>
            <textarea
              onChange={(e) => {
                const note = notes.find((note) => note.id === selectedNote);
                handleUpdateNote(note.id, e.target.value, note.content);
              }}
              className="contentTitle"
              value={findNote.title ? findNote.title : ""}
              readOnly={canEdit}
            ></textarea>
            <textarea
              autoFocus
              readOnly={canEdit}
              onChange={(e) => {
                const note = notes.find((note) => note.id === selectedNote);
                handleUpdateNote(note.id, note.title, e.target.value);
              }}
              value={findNote.content ? findNote.content : ""}
              className="contentText"
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
};
