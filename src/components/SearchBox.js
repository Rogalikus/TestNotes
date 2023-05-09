import React from "react";

const SearchBox = ({ setSearchValue, searchValue }) => {
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div>
      <input
        value={searchValue}
        onChange={searchHandler}
        placeholder="Search"
      ></input>
    </div>
  );
};

export default SearchBox;
