import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("https://mern-note-orious.onrender.com/api/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  return (
    <div>
      <h1>My Notes</h1>
      {notes.map(note => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
