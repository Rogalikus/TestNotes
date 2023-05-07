import React from "react";
import SideBar from "./Sidebar";
import SearchBox from "./SearchBox";

const Header = ({ addNote, setNotes, getNotes }) => {
  return (
    <div className="Header">
      <SideBar addNote={addNote} setNotes={setNotes} getNotes={getNotes} />
      <SearchBox />
    </div>
  );
};

export default Header;
