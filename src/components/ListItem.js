import React, { useContext } from "react";
import { AppContext } from "../App";

export const ListItem = ({ id, title, content }) => {
  const { setSelectedNote } = useContext(AppContext);

  return (
    <div>
      <div onClick={() => setSelectedNote(id)} className="notes">
        <h2>{title}</h2>
        <div className="contentInList">{content}</div>
      </div>
    </div>
  );
};
