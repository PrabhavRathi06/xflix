import "./Header.css";

import { useState } from "react";

import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";
import uploadIcon from "../../assets/upload.png";

import UploadModal from "../UploadModal/UploadModal";

const genres = ["All Genre", "Education", "Sports", "Comedy", "Lifestyle"];

const ratings = ["Any age group", "7+", "12+", "16+", "18+"];

function Header({
  searchText,
  setSearchText,
  selectedGenres,
  setSelectedGenres,
  selectedAge,
  setSelectedAge,
  sortBy,
  setSortBy,
  showSortMenu,
  setShowSortMenu,

  // NEW
  refreshVideos,
  setRefreshVideos,
}) {
  const [openModal, setOpenModal] = useState(false);

  const handleGenre = (genre) => {
    if (genre === "All Genre") {
      setSelectedGenres(["All Genre"]);
      return;
    }

    let temp = selectedGenres.filter((g) => g !== "All Genre");

    if (temp.includes(genre)) {
      temp = temp.filter((g) => g !== genre);
    } else {
      temp.push(genre);
    }

    if (temp.length === 0) {
      temp = ["All Genre"];
    }

    setSelectedGenres(temp);
  };

  return (
    <>
      <header className="header">
        <img src={logo} alt="logo" className="logo" />

        <div className="header__search">
          <input
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button>
            <img src={searchIcon} alt="search" />
          </button>
        </div>

        <button
          className="uploadBtn"
          onClick={() => setOpenModal(true)}
        >
          <img src={uploadIcon} alt="upload" />
          Upload
        </button>
      </header>

      <section className="filterPanel">
        <div className="topRow">
          <div className="genreButtons">
            {genres.map((genre) => (
              <button
                key={genre}
                className={
                  selectedGenres.includes(genre)
                    ? "pill active"
                    : "pill"
                }
                onClick={() => handleGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="sortWrapper">
            <button
              className="sortButton"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              ↕ {sortBy === "releaseDate" ? "Release Date" : "View Count"}
            </button>

            {showSortMenu && (
              <div className="sortMenu">
                <div
                  className="sortItem"
                  onClick={() => {
                    setSortBy("releaseDate");
                    setShowSortMenu(false);
                  }}
                >
                  Release Date
                </div>

                <div
                  className="sortItem"
                  onClick={() => {
                    setSortBy("viewCount");
                    setShowSortMenu(false);
                  }}
                >
                  View Count
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ratingButtons">
          {ratings.map((rating) => (
            <button
              key={rating}
              className={selectedAge === rating ? "pill active" : "pill"}
              onClick={() => setSelectedAge(rating)}
            >
              {rating}
            </button>
          ))}
        </div>
      </section>

      <UploadModal
        open={openModal}
        onClose={() => setOpenModal(false)}

        // NEW
        refreshVideos={refreshVideos}
        setRefreshVideos={setRefreshVideos}
      />
    </>
  );
}

export default Header;