import React from "react";

const SideBar = ({ addNote, setNotes, getNotes }) => {
  const handleAddNote = (title, content) => {
    addNote({ title, content });
    debugger;
    getNotes((notes) => {
      setNotes(notes);
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          const title = "Без назви";
          const content = "";
          handleAddNote(title, content);
        }}
      >
        +
      </button>
      <button>delete</button>
      <button>edit</button>
    </div>
  );
};

export default SideBar;
