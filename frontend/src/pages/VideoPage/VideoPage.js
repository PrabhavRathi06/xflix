import "./VideoPage.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import likeIcon from "../../assets/like.png";
import dislikeIcon from "../../assets/dislike.png";

import VideoCard from "../../components/VideoCard/VideoCard";

const BACKEND_ENDPOINT =
  "https://45d4b968-e540-4bcd-bda5-f511837bc4e0.mock.pstmn.io";

function VideoPage() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideo();
    fetchVideos();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT}/v1/videos/${id}`);

      setVideo(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT}/v1/videos`);

      setVideos(response.data.videos);
    } catch (err) {
      console.log(err);
    }
  };

  const updateVote = async (vote) => {
    try {
      await axios.patch(`${BACKEND_ENDPOINT}/v1/videos/${id}/votes`, {
        vote,
        change: "increase",
      });

      setVideo((prev) => ({
        ...prev,
        votes: {
          ...prev.votes,
          upVotes:
            vote === "upVote" ? prev.votes.upVotes + 1 : prev.votes.upVotes,
          downVotes:
            vote === "downVote"
              ? prev.votes.downVotes + 1
              : prev.votes.downVotes,
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  if (!video) {
    return (
      <div className="videoPage">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="videoPage">
      <iframe
        className="videoPlayer"
        src={`https://${video.videoLink}`}
        title={video.title}
        frameBorder="0"
        allowFullScreen
      />

      <div className="videoContent">
        <div className="titleRow">
          <div>
            <h1>{video.title}</h1>

            <div className="videoInfo">
              <span>{video.viewCount} Views</span>
              <span> • </span>
              <span>{video.genre}</span>
              <span> • </span>
              <span>{video.releaseDate}</span>
            </div>
          </div>

          <div className="voteButtons">
            <button className="likeButton" onClick={() => updateVote("upVote")}>
              <img src={likeIcon} alt="Like" />
              <span>{video.votes.upVotes}</span>
            </button>

            <button
              className="dislikeButton"
              onClick={() => updateVote("downVote")}
            >
              <img src={dislikeIcon} alt="Dislike" />
              <span>{video.votes.downVotes}</span>
            </button>
          </div>
        </div>

        <hr />

        <div className="relatedVideos">
          {videos
            .filter((item) => item._id !== id)
            .map((item) => (
              <VideoCard key={item._id} video={item} />
            ))}
        </div>
      </div>
      <hr />

      <div className="relatedVideos">
        {videos
          .filter((item) => item._id !== id)
          .map((item) => (
            <VideoCard key={item._id} video={item} />
          ))}
      </div>
    </div>
  );
}

export default VideoPage;
