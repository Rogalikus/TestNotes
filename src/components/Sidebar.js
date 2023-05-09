import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../App";

const SideBar = ({ setCanEdit, editRef }) => {
  const {
    addNote,
    setNotes,
    getNotes,
    selectedNote,
    deleteNote,
    setSelectedNote,
    notes,
  } = useContext(AppContext);

  const buttonRef = useRef(null);

  const handleAddNote = (title, content) => {
    addNote({ title, content });
    getNotes((notes) => {
      setNotes(notes);
    });
  };

  const handleDeleteNote = (id) => {
    setSelectedNote(null);
    deleteNote(id);
    getNotes((notes) => {
      setNotes(notes);
    });
  };
  // !event.target.classList.contains("content")
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !buttonRef.current.contains(event.target) &&
        editRef &&
        editRef.current &&
        !editRef?.current.contains(event.target)
      ) {
        setCanEdit(true);
      }
      return;
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const note = notes.find((el) => el.id === selectedNote);

  return (
    <div>
      <button
        onClick={() => {
          const title = "Без назви";
          const content = "";
          handleAddNote(title, content);
        }}
      >
        +
      </button>
      <button onClick={() => handleDeleteNote(note.id)}>delete</button>
      <button
        ref={buttonRef}
        onClick={() => {
          setCanEdit(false);
        }}
      >
        edit
      </button>
    </div>
  );
};

export default SideBar;
