import React, { useContext } from "react";
import { AppContext } from "../../../App";
import "./PopUp.css";

export const PopUpConfirm = ({ title, setVisiblePopUp }) => {
  const { setNotes, getNotes, deleteNote, setSelectedNote, selectedNote } =
    useContext(AppContext);

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

  return (
    <div className="backPopUp">
      <div className="PopUp">
        <div className="PopUpWindow">
          <div className="ConfirmContent">
            <span>
              Ви впевнені, що хочете видалити нотатку з назвою: {title}
            </span>
            <div className="buttonPopUp">
              <button
                className="cancelButton"
                onClick={() => {
                  setVisiblePopUp(false);
                }}
              >
                Скасувати
              </button>
              <button
                className="confirmButton"
                onClick={() => {
                  handleDeleteNote(selectedNote);
                  setVisiblePopUp(false);
                }}
              >
                Підтвердити
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
