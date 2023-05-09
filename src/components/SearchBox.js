import React from "react";

const SearchBox = ({ setSearchValue, searchValue }) => {
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="searchBox">
      <input
        className="search"
        value={searchValue}
        onChange={searchHandler}
        placeholder="🔍︎ Search"
      ></input>
    </div>
  );
};

export default SearchBox;
