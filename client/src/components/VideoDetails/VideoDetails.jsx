import { useEffect } from "react";
import { getVideo } from "../../api";

const VideoDetails = ({ videoId, tokens, videoInfo, setVideoInfo }) => {
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await getVideo(videoId, tokens);
        console.log(res);
        setVideoInfo(res?.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
  
    if (tokens?.access_token) {
      fetchVideo();
    }
  }, [tokens, videoId]);

  if (!videoInfo) return <>Loading…</>;

  return (
    <div>
      <h2>{videoInfo?.snippet?.title}</h2>
      <p>{videoInfo?.snippet?.description}</p>
      <img src={videoInfo?.snippet?.thumbnails?.default?.url} alt="" />
      <p>Views: {videoInfo?.statistics?.viewCount}</p>
    </div>
  );
};

export default VideoDetails;
