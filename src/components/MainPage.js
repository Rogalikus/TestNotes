import React, { useContext, useRef, useState } from "react";
import Header from "./Header/Header";
import { AppContext } from "../App";
import "../App.css";
import { ListItem } from "./ListItem/ListItem";
import { useWindowSize } from "usehooks-ts";
import { WorkSpace } from "./WorkSpace/WorkSpace";

export const MainPage = () => {
  const { notes, selectedNote } = useContext(AppContext);

  const editRef = useRef(null);
  const [canEdit, setCanEdit] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { width } = useWindowSize();
  const [showNoteList, setShowNoteList] = useState(false);

  return (
    <div className="App">
      <Header
        setShowNoteList={setShowNoteList}
        setCanEdit={setCanEdit}
        editRef={editRef}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      <div className="MainContent">
        {width > 1000 || showNoteList ? (
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
                  setShowNoteList={setShowNoteList}
                  lastChange={note.lastChange}
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                />
              ))}
          </div>
        ) : (
          ""
        )}
        {selectedNote && <WorkSpace editRef={editRef} canEdit={canEdit} />}
      </div>
    </div>
  );
};
