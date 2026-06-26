import "./VideoCard.css";

import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link
      to={`/video/${video._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="videoCard">
        <img
          src={video.previewImage}
          alt={video.title}
          className="videoImage"
        />

        <div className="videoContent">
          <h3>{video.title}</h3>
          <p>{video.releaseDate}</p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
