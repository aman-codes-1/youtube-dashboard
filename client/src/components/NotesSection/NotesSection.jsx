import { useEffect, useState } from "react";
import { fetchNotes, addNote, delNote } from "../../api";

const NotesSection = ({ videoId }) => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchNotes(videoId).then((r) => setNotes(r.data));
  }, [videoId]);

  const save = async () => {
    const r = await addNote({ videoId, text });
    setNotes([...notes, r.data]);
    setText("");
  };

  return (
    <div>
      <h3>Notes</h3>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={save}>Add Note</button>
      <ul>
        {notes.map((n) => (
          <li key={n._id}>
            {n.text}{" "}
            <button
              onClick={() => {
                delNote(n._id).then(() =>
                  setNotes(notes.filter((x) => x._id !== n._id))
                );
              }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesSection;
