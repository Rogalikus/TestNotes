import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import { PopUpConfirm } from "./PopUpConfirm";

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
  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const handleAddNote = (title, content) => {
    addNote({ title, content });
    getNotes((notes) => {
      setNotes(notes);
    });
  };

  const handleDeleteNote = (id) => {
    if (id) {
      setSelectedNote(null);
      deleteNote(id);
      getNotes((notes) => {
        setNotes(notes);
      });
    }
    return false;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editRef &&
        editRef.current &&
        !editRef?.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setCanEdit(true);
      }
      return;
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [editRef, setCanEdit]);

  const note = notes.find((el) => el.id === selectedNote);

  return (
    <div className="buttonsDiv">
      <button className="buttonPhone">listForPhone</button>
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
      {visiblePopUp && (
        <PopUpConfirm title={note?.title} setVisiblePopUp={setVisiblePopUp} />
      )}
      <button
        className="deleteButton"
        disabled={selectedNote ? false : true}
        onClick={() => setVisiblePopUp(true)}
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
