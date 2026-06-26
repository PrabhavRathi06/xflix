import "./Dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../VideoCard/VideoCard";

const BACKEND_ENDPOINT =
  "https://45d4b968-e540-4bcd-bda5-f511837bc4e0.mock.pstmn.io";

function Dashboard({
  searchText,
  selectedGenres,
  selectedAge,
  sortBy,
  refreshVideos, // NEW
}) {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  // Fetch videos on first load and whenever refreshVideos changes
  useEffect(() => {
    fetchVideos();
  }, [refreshVideos]);

  // Apply filters whenever data or filters change
  useEffect(() => {
    applyFilters();
  }, [videos, searchText, selectedGenres, selectedAge, sortBy]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_ENDPOINT}/v1/videos`
      );

      setVideos(response.data.videos);
    } catch (err) {
      console.log(err);
    }
  };

  const applyFilters = () => {
    let result = [...videos];

    // Search
    if (searchText.trim() !== "") {
      result = result.filter((video) =>
        video.title
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    // Genre
    if (
      selectedGenres.length > 0 &&
      !selectedGenres.includes("All Genre")
    ) {
      result = result.filter((video) =>
        selectedGenres.includes(video.genre)
      );
    }

    // Age
    if (selectedAge !== "Any age group") {
      result = result.filter(
        (video) => video.contentRating === selectedAge
      );
    }

    // Sort
    if (sortBy === "viewCount") {
      result.sort((a, b) => b.viewCount - a.viewCount);
    }

    if (sortBy === "releaseDate") {
      result.sort(
        (a, b) =>
          new Date(b.releaseDate) -
          new Date(a.releaseDate)
      );
    }

    setFilteredVideos(result);
  };

  return (
    <main className="dashboard">
      <div className="video-grid">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
          />
        ))}
      </div>
    </main>
  );
}

export default Dashboard;