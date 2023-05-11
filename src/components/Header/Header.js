import React from "react";
import SideBar from "./SideBar/Sidebar";
import SearchBox from "./Search/SearchBox";
import "./Header.css";

const Header = ({
  setCanEdit,
  editRef,
  setSearchValue,
  searchValue,
  setShowNoteList,
}) => {
  return (
    <div className="Header">
      <SideBar
        setCanEdit={setCanEdit}
        editRef={editRef}
        setShowNoteList={setShowNoteList}
      />
      <SearchBox setSearchValue={setSearchValue} searchValue={searchValue} />
    </div>
  );
};

export default Header;
