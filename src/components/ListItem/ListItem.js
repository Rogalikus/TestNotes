import React, { useContext } from "react";
import { AppContext } from "../../App";
import { useWindowSize } from "usehooks-ts";
import "./ListItem.css";

export const ListItem = ({
  id,
  title,
  content,
  lastChange,
  setShowNoteList,
}) => {
  const { setSelectedNote, selectedNote } = useContext(AppContext);
  const { width } = useWindowSize();

  return (
    <div>
      <div
        onClick={() => {
          if (width < 1000) {
            setShowNoteList(false);
            setSelectedNote(id);
          }
          setSelectedNote(id);
        }}
        className={selectedNote === id ? "selectedNotes" : "notes"}
      >
        <h2>{title}</h2>
        <div className="listInfo">
          <div className="lastChangeInList">{lastChange?.slice(5, 17)}</div>
          <div className="contentInList">{content}</div>
        </div>
      </div>
    </div>
  );
};
