const DB_NAME = "notesDB";
const STORE_NAME = "notesStore";

const request = indexedDB.open(DB_NAME, 1);

request.onerror = (event) => {
  console.error(`Database error: ${event.target.error}`);
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore(STORE_NAME, {
    keyPath: "id",
    autoIncrement: true,
  });
  store.createIndex("title", "title", { unique: false });
  store.createIndex("content", "content", { unique: false });
};

let db;

request.onsuccess = (event) => {
  db = event.target.result;
};

const addNote = (note) => {
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.add(note);

  request.onsuccess = (event) => {
    console.log("Note added successfully");
  };

  request.onerror = (event) => {
    console.error(`Error adding note: ${event.target.error}`);
  };
};

const getNotes = (callback) => {
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();

  request.onsuccess = (event) => {
    const notes = event.target.result;
    callback(notes);
  };

  request.onerror = (event) => {
    console.error(`Error getting notes: ${event.target.error}`);
    callback([]);
  };
};

const updateNote = (note) => {
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.put(note);

  request.onsuccess = (event) => {
    console.log("Note updated successfully");
  };

  request.onerror = (event) => {
    console.error(`Error updating note: ${event.target.error}`);
  };
};

const deleteNote = (id) => {
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.delete(id);

  request.onsuccess = (event) => {
    console.log("Note deleted successfully");
  };

  request.onerror = (event) => {
    console.error(`Error deleting note: ${event.target.error}`);
  };
};

export { addNote, deleteNote, updateNote, getNotes };
