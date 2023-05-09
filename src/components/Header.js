import React from "react";
import SideBar from "./Sidebar";
import SearchBox from "./SearchBox";

const Header = ({ setCanEdit, editRef, setSearchValue, searchValue }) => {
  return (
    <div className="Header">
      <SideBar setCanEdit={setCanEdit} editRef={editRef} />
      <SearchBox setSearchValue={setSearchValue} searchValue={searchValue} />
    </div>
  );
};

export default Header;
