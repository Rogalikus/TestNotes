import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../App";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";

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
    <div className="buttonsDiv">
      <button
        className="addNoteButton"
        onClick={() => {
          const title = "Без назви";
          const content = "";
          handleAddNote(title, content);
        }}
      >
        <AddTwoToneIcon fontSize="medium" />
      </button>
      <button
        className="deleteButton"
        onClick={() => handleDeleteNote(note.id)}
      >
        <DeleteTwoToneIcon fontSize="medium" />
      </button>
      <button
        className="editNoteButton"
        ref={buttonRef}
        onClick={() => {
          setCanEdit(false);
        }}
      >
        <EditNoteTwoToneIcon fontSize="medium" />
      </button>
    </div>
  );
};

export default SideBar;
