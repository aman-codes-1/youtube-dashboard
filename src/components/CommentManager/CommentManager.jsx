import { useEffect, useState } from "react";
import {
  getComments,
  postComment,
  postReply,
  deleteComment,
} from "../../api";

const CommentManager = ({ videoId, tokens }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState({});

  const fetchComments = async () => {
    try {
      const res = await getComments(videoId, tokens);
      setComments(res.data.items || []);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  useEffect(() => {
    if (tokens?.access_token) {
      fetchComments();
    }
  }, [tokens]);

  const add = async () => {
    await postComment(videoId, text, tokens);
    setText("");
    fetchComments();
  };

  const reply = async (parentId) => {
    const replyText = replies[parentId];
    await postReply(parentId, replyText, tokens);
    setReplies((prev) => ({ ...prev, [parentId]: "" }));
    fetchComments(); // refresh list
  };

  const remove = async (commentId) => {
    await deleteComment(commentId, tokens);
    fetchComments(); // refresh list
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h3>New Comment</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={add}>Comment</button>

      <h3 style={{ marginTop: 30 }}>Comments</h3>
      {comments.map((comment) => {
        const commentText = comment.snippet.topLevelComment.snippet.textDisplay;
        const commentId = comment.snippet.topLevelComment.id;

        return (
          <div key={commentId} style={{ marginTop: 20, padding: 10, border: "1px solid #ccc" }}>
            <p dangerouslySetInnerHTML={{ __html: commentText }} />
            <button onClick={() => remove(commentId)}>Delete</button>

            <div style={{ marginTop: 10 }}>
              <input
                type="text"
                value={replies[commentId] || ""}
                placeholder="Reply..."
                onChange={(e) =>
                  setReplies((prev) => ({ ...prev, [commentId]: e.target.value }))
                }
              />
              <button onClick={() => reply(commentId)}>Reply</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentManager;
