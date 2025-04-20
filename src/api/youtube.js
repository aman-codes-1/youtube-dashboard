import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URI}/api`,
});

export const getVideo = (videoId, tokens) =>
  api.post(`/youtube/video/${videoId}`, { tokens });
export const updateMeta = (videoId, data, tokens) =>
  api.post(`/youtube/video/${videoId}/metadata`, { ...data, tokens });
export const getComments = (videoId, tokens) =>
  api.post(`/youtube/video/${videoId}/comments`, { tokens });
export const postComment = (videoId, text, tokens) =>
  api.post(`/youtube/video/${videoId}/comment`, { text, tokens });
export const postReply = (commentId, text, tokens) =>
  api.post(`/youtube/comment/${commentId}/reply`, { text, tokens });
export const deleteComment = (commentId, tokens) =>
  api.delete(`/youtube/comment/${commentId}`, { data: { tokens } });

export const fetchNotes = (videoId) => api.get(`/notes/${videoId}`);
export const addNote = (note) => api.post(`/notes`, note);
export const delNote = (id) => api.delete(`/notes/${id}`);
