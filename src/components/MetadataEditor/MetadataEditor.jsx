import { useState } from "react";
import { updateMeta } from "../../api";

const MetadataEditor = ({ videoId, tokens, current }) => {
  const [title, setTitle] = useState(current.title);
  const [desc, setDesc] = useState(current.description);

  const save = () => updateMeta(videoId, { title, description: desc }, tokens);

  return (
    <div>
      <h3>Edit Metadata</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
      <button onClick={save}>Save</button>
    </div>
  );
};

export default MetadataEditor;
