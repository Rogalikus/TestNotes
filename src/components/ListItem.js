import React, { useContext } from "react";
import { AppContext } from "../App";

export const ListItem = ({ id, title, content, lastChange }) => {
  const { setSelectedNote, selectedNote } = useContext(AppContext);

  return (
    <div>
      <div
        onClick={() => setSelectedNote(id)}
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
