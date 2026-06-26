import "./App.css";

import { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import VideoPage from "./pages/VideoPage/VideoPage";

function LandingPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedGenres, setSelectedGenres] = useState(["All Genre"]);
  const [selectedAge, setSelectedAge] = useState("Any age group");
  const [sortBy, setSortBy] = useState("releaseDate");
  const [showSortMenu, setShowSortMenu] = useState(false);

  // NEW STATE
  const [refreshVideos, setRefreshVideos] = useState(false);

  return (
    <>
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        selectedAge={selectedAge}
        setSelectedAge={setSelectedAge}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showSortMenu={showSortMenu}
        setShowSortMenu={setShowSortMenu}
        refreshVideos={refreshVideos}
        setRefreshVideos={setRefreshVideos}
      />

      <Dashboard
        searchText={searchText}
        selectedGenres={selectedGenres}
        selectedAge={selectedAge}
        sortBy={sortBy}
        refreshVideos={refreshVideos}
      />
    </>
  );
}

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/video/:id" component={VideoPage} />
    </Switch>
  );
}

export default App;