import { useEffect, useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Row from "./components/Row";
import Footer from "./components/Footer";
import DetailsModal from "./components/DetailsModal";
import SearchResults from "./components/SearchResults";
import MyListPage from "./components/MyListPage";
import CategoriesPage from "./components/CategoriesPage";
import pageClasses from "./components/Page.module.css";
import requests, { hasApiKey, recommendationsUrl } from "./utils/requests";
import { movies } from "./Data/Data";
import { AppProvider, useApp } from "./context/AppContext";

// `localMovies` is only used in demo mode (no API key); each row gets a different
// ordering so the page doesn't show identical rows.
const rotate = (arr, n) => [...arr.slice(n), ...arr.slice(0, n)];
const reversed = [...movies].reverse();

const HOME_ROWS = [
  { title: "Popular on Netflix", fetchUrl: requests.fetchTrending, localMovies: movies },
  { title: "Recently added on Netflix", fetchUrl: requests.fetchNewNetflixSeries, mediaType: "tv", localMovies: rotate(movies, 4) },
  { title: "Netflix Originals", fetchUrl: requests.fetchNetflixOriginals, mediaType: "tv", localMovies: rotate(movies, 3) },
  { title: "Top Rated", fetchUrl: requests.fetchTopRatedMovies, mediaType: "movie", localMovies: reversed },
  { title: "Action Movies", fetchUrl: requests.fetchActionMovies, mediaType: "movie", localMovies: rotate(movies, 5) },
  { title: "Comedy Movies", fetchUrl: requests.fetchComedyMovies, mediaType: "movie", localMovies: rotate(movies, 1) },
  { title: "Horror Movies", fetchUrl: requests.fetchHorrorMovies, mediaType: "movie", localMovies: rotate(reversed, 4) },
  { title: "Romance Movies", fetchUrl: requests.fetchRomanceMovies, mediaType: "movie", localMovies: rotate(movies, 7) },
  { title: "Documentaries", fetchUrl: requests.fetchDocumentaries, mediaType: "movie", localMovies: rotate(movies, 2) },
];

const TV_ROWS = [
  { title: "Netflix Originals", fetchUrl: requests.fetchNetflixOriginals, mediaType: "tv", localMovies: movies },
  { title: "Recently added series", fetchUrl: requests.fetchNewNetflixSeries, mediaType: "tv", localMovies: rotate(movies, 2) },
  { title: "Popular TV", fetchUrl: requests.fetchPopularTv, mediaType: "tv", localMovies: reversed },
  { title: "Top Rated TV", fetchUrl: requests.fetchTopRatedTv, mediaType: "tv", localMovies: rotate(movies, 5) },
  { title: "TV Dramas", fetchUrl: requests.fetchDramaTv, mediaType: "tv", localMovies: rotate(movies, 1) },
  { title: "Sci-Fi & Fantasy", fetchUrl: requests.fetchSciFiTv, mediaType: "tv", localMovies: rotate(reversed, 3) },
];

const MOVIE_ROWS = [
  { title: "Recently added movies", fetchUrl: requests.fetchNewNetflixMovies, mediaType: "movie", localMovies: movies },
  { title: "Popular Movies", fetchUrl: requests.fetchPopularMovies, mediaType: "movie", localMovies: reversed },
  { title: "Top Rated", fetchUrl: requests.fetchTopRatedMovies, mediaType: "movie", localMovies: rotate(movies, 3) },
  { title: "Action Movies", fetchUrl: requests.fetchActionMovies, mediaType: "movie", localMovies: rotate(movies, 5) },
  { title: "Comedy Movies", fetchUrl: requests.fetchComedyMovies, mediaType: "movie", localMovies: rotate(movies, 1) },
  { title: "Horror Movies", fetchUrl: requests.fetchHorrorMovies, mediaType: "movie", localMovies: rotate(reversed, 4) },
  { title: "Documentaries", fetchUrl: requests.fetchDocumentaries, mediaType: "movie", localMovies: rotate(movies, 2) },
];

const NEW_ROWS = [
  { title: "New on Netflix: Series", fetchUrl: requests.fetchNewNetflixSeries, mediaType: "tv", localMovies: movies },
  { title: "New on Netflix: Movies", fetchUrl: requests.fetchNewNetflixMovies, mediaType: "movie", localMovies: rotate(movies, 4) },
  { title: "Trending this week", fetchUrl: requests.fetchTrending, localMovies: reversed },
  { title: "Netflix Originals", fetchUrl: requests.fetchNetflixOriginals, mediaType: "tv", localMovies: rotate(movies, 2) },
];

// wait until the user pauses typing before searching
function useDebounced(value, ms = 350) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

function RowsPage({ rows }) {
  return (
    <div className={`${pageClasses.page} ${pageClasses.rows}`}>
      {rows.map((row) => (
        <Row key={row.title} {...row} />
      ))}
    </div>
  );
}

function Home() {
  const { liked } = useApp();
  const last = liked[0]; // most recently liked title

  return (
    <>
      <Banner />
      {/* real recommendations from TMDB based on the last title you liked */}
      {hasApiKey && last && (
        <Row
          key={last.key}
          title={`Because you liked ${last.title}`}
          fetchUrl={recommendationsUrl(last.media_type, last.id)}
          mediaType={last.media_type}
        />
      )}
      {HOME_ROWS.map((row) => (
        <Row key={row.title} {...row} />
      ))}
    </>
  );
}

function Shell() {
  const [view, setView] = useState("home");
  const [query, setQuery] = useState("");
  const search = useDebounced(query.trim());

  let page;
  if (query.trim()) {
    // while the debounce catches up, keep showing the previous search (or nothing)
    page = search ? <SearchResults query={search} /> : null;
  } else if (view === "tv") page = <RowsPage rows={TV_ROWS} />;
  else if (view === "movies") page = <RowsPage rows={MOVIE_ROWS} />;
  else if (view === "new") page = <RowsPage rows={NEW_ROWS} />;
  else if (view === "mylist") page = <MyListPage />;
  else if (view === "categories") page = <CategoriesPage />;
  else page = <Home />;

  return (
    <>
      <Header
        view={view}
        onNavigate={(v) => {
          setView(v);
          window.scrollTo(0, 0);
        }}
        onSearch={setQuery}
      />
      <main>{page}</main>
      <Footer />
      <DetailsModal />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}

export default App;
