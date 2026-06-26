import "./UploadModal.css";
import { useState } from "react";
import axios from "axios";

const BACKEND_ENDPOINT =
  "https://45d4b968-e540-4bcd-bda5-f511837bc4e0.mock.pstmn.io";

function UploadModal({
  open,
  onClose,
  refreshVideos,
  setRefreshVideos,
}) {
  const [videoLink, setVideoLink] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [contentRating, setContentRating] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  if (!open) return null;

  const formatDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const d = new Date(date);

    return `${String(d.getDate()).padStart(2, "0")} ${
      months[d.getMonth()]
    } ${d.getFullYear()}`;
  };

  const uploadVideo = async () => {
    if (
      !videoLink ||
      !previewImage ||
      !title ||
      !genre ||
      !contentRating ||
      !releaseDate
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      await axios.post(`${BACKEND_ENDPOINT}/v1/videos`, {
        videoLink,
        previewImage,
        title,
        genre,
        contentRating,
        releaseDate: formatDate(releaseDate),
      });

      alert("Video uploaded successfully!");

      // Trigger Dashboard refresh
      setRefreshVideos(!refreshVideos);

      // Clear form
      setVideoLink("");
      setPreviewImage("");
      setTitle("");
      setGenre("");
      setContentRating("");
      setReleaseDate("");

      // Close modal
      onClose();
    } catch (err) {
      console.log(err);
      alert("Upload failed.");
    }
  };

  return (
    <div className="modalOverlay">
      <div className="uploadModal">
        <div className="modalHeader">
          <h2>Upload Video</h2>

          <button className="closeButton" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modalForm">
          <input
            type="text"
            placeholder="Video Link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />

          <input
            type="text"
            placeholder="Thumbnail Image Link"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Genre</option>
            <option value="Education">Education</option>
            <option value="Sports">Sports</option>
            <option value="Comedy">Comedy</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Movies">Movies</option>
          </select>

          <select
            value={contentRating}
            onChange={(e) => setContentRating(e.target.value)}
          >
            <option value="">Suitable Age Group</option>
            <option value="7+">7+</option>
            <option value="12+">12+</option>
            <option value="16+">16+</option>
            <option value="18+">18+</option>
          </select>

          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>

        <div className="modalFooter">
          <button
            className="uploadVideoBtn"
            onClick={uploadVideo}
          >
            Upload Video
          </button>

          <button
            className="cancelBtn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;