import { useEffect, useMemo, useState } from "react";
import axios from "../utils/axios";
import { discoverUrl, hasApiKey } from "../utils/requests";
import { MOVIE_GENRES, TV_GENRES, normalizeLocal, normalizeMovie } from "../utils/constants";
import { applyView, genreOptions } from "../utils/browse";
import { movies as localMovies } from "../Data/Data";
import Grid from "./Grid";
import Toolbar from "./Toolbar";
import toolbarClasses from "./Toolbar.module.css";
import classes from "./Page.module.css";

// Sort choices when TMDB does the sorting for us
const SERVER_SORTS = [
  { value: "popular", label: "Most popular" },
  { value: "rating", label: "Highest rated" },
  { value: "newest", label: "Newest first" },
];

const LOCAL = localMovies.map(normalizeLocal);

function Chips({ options, value, onChange }) {
  return (
    <div className={toolbarClasses.chips} role="group" aria-label="Categories">
      {options.map(([id, name]) => (
        <button
          key={id}
          className={`${toolbarClasses.chip} ${value === id ? toolbarClasses.on : ""}`}
          aria-pressed={value === id}
          onClick={() => onChange(id)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

// ---- with an API key: each category is a TMDB "discover" query, sorted by TMDB ----
function LiveCategories() {
  const [type, setType] = useState("movie");
  const genres = type === "tv" ? TV_GENRES : MOVIE_GENRES;
  const [genre, setGenre] = useState(MOVIE_GENRES[0][0]);
  const [sort, setSort] = useState("popular");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  // movies and TV have different genre lists, so reset the genre when the type changes
  const changeType = (next) => {
    if (next === type) return;
    setType(next);
    setGenre((next === "tv" ? TV_GENRES : MOVIE_GENRES)[0][0]);
  };

  // new category / sort / type -> start again from page 1
  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [type, genre, sort]);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    (async () => {
      try {
        const res = await axios.get(discoverUrl({ type, genre, sort, page }));
        if (cancelled) return;
        const fresh = res.data.results
          .filter((m) => m.backdrop_path || m.poster_path)
          .map((m) => normalizeMovie(m, type));
        // keep what we already have and add the new page (skipping any duplicates)
        setItems((prev) => {
          const seen = new Set(prev.map((m) => m.key));
          return [...prev, ...fresh.filter((m) => !seen.has(m.key))];
        });
        setTotalPages(res.data.total_pages || 1);
        setStatus("ready");
      } catch (err) {
        console.error("Category request failed:", err.message);
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [type, genre, sort, page]);

  const genreName = genres.find(([id]) => id === genre)?.[1];

  return (
    <>
      <Toolbar
        type={type === "movie" ? "movie" : "tv"}
        setType={changeType}
        sort={sort}
        setSort={setSort}
        sorts={SERVER_SORTS}
        total={undefined}
        typeOptionsOnly
      />
      <Chips options={genres} value={genre} onChange={setGenre} />
      <h2 className={classes.subheading}>{genreName}</h2>

      {status === "error" ? (
        <p className={classes.note}>Couldn't load this category. Check your connection and API key, then try again.</p>
      ) : (
        <Grid items={items} empty={status === "loading" ? "Loading…" : "No titles found in this category."} />
      )}

      {status === "ready" && page < totalPages && (
        <div className={classes.more}>
          <button onClick={() => setPage((p) => p + 1)}>Load more</button>
        </div>
      )}
    </>
  );
}

// ---- demo mode: categories come from the genres of the local posters ----
function DemoCategories() {
  const genres = useMemo(() => genreOptions(LOCAL), []);
  const [genre, setGenre] = useState(genres[0]);
  const [sort, setSort] = useState("default");
  const visible = useMemo(() => applyView(LOCAL, { genre, sort }), [genre, sort]);

  return (
    <>
      <Toolbar
        sort={sort}
        setSort={setSort}
        sorts={[
          { value: "default", label: "Default" },
          { value: "az", label: "A–Z" },
          { value: "za", label: "Z–A" },
        ]}
        total={visible.length}
      />
      <Chips options={genres.map((g) => [g, g])} value={genre} onChange={setGenre} />
      <h2 className={classes.subheading}>{genre}</h2>
      <Grid items={visible} empty="No titles in this category." />
    </>
  );
}

function CategoriesPage() {
  return (
    <div className={classes.page}>
      <h1 className={classes.heading}>Categories</h1>
      {hasApiKey ? <LiveCategories /> : <DemoCategories />}
    </div>
  );
}

export default CategoriesPage;
