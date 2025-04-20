import { useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  CommentManager,
  MetadataEditor,
  NotesSection,
  VideoDetails,
} from "./components";

function App() {
  const [tokens, setTokens] = useState(() => {
    const stored = localStorage.getItem("google_tokens");
    return stored ? JSON.parse(stored) : null;
  });
  const videoId = "TwxfhFmJyW0";
  const [videoInfo, setVideoInfo] = useState(null);

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/youtube.force-ssl",
    onSuccess: async (tokenResponse) => {
      try {
        setTokens(tokenResponse);
        localStorage.setItem("google_tokens", JSON.stringify(tokenResponse));
      } catch (error) {
        console.error("Login Error", error);
      }
    },
    onError: (err) => console.error("Login Failed", err),
  });

  const logout = () => {
    localStorage.removeItem('google_tokens');
    googleLogout();
    window.location.reload();
  }

  if (!tokens) {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => login()}>Sign in with Google</button>
      </div>
    );
  }

  return (
    <>
      <div style={{ padding: 20 }}>
        <VideoDetails
          videoId={videoId}
          tokens={tokens}
          videoInfo={videoInfo}
          setVideoInfo={setVideoInfo}
        />
        {videoInfo && (
          <MetadataEditor
            videoId={videoId}
            tokens={tokens}
            current={videoInfo?.snippet}
          />
        )}
        <CommentManager videoId={videoId} tokens={tokens} />
        <NotesSection videoId={videoId} />
      </div>
      <div style={{ padding: 20 }}>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </>
  );
}

export default App;
