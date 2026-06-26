import "./GenrePanel.css";

function GenrePanel() {
  return (
    <div className="genre-panel">

      <div className="genre-row">
        <button className="chip active">All Genre</button>
        <button className="chip">Education</button>
        <button className="chip">Sports</button>
        <button className="chip">Comedy</button>
        <button className="chip">Lifestyle</button>

        <select className="sort-dropdown">
          <option value="releaseDate">Release Date</option>
          <option value="viewCount">View Count</option>
        </select>
      </div>

      <div className="rating-row">
        <button className="chip active">Any age group</button>
        <button className="chip">7+</button>
        <button className="chip">12+</button>
        <button className="chip">16+</button>
        <button className="chip">18+</button>
      </div>

    </div>
  );
}

export default GenrePanel;