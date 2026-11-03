import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { hasApiKey, searchUrl } from "../utils/requests";
import { normalizeLocal, normalizeMovie } from "../utils/constants";
import { movies as localMovies } from "../Data/Data";
import Grid from "./Grid";
import Toolbar, { useBrowseView } from "./Toolbar";
import classes from "./Page.module.css";

function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);
  const { visible, toolbar } = useBrowseView(results);

  useEffect(() => {
    let cancelled = false;
    setDone(false);

    (async () => {
      try {
        let list;
        if (hasApiKey) {
          const res = await axios.get(searchUrl(query));
          list = res.data.results
            .filter((m) => (m.media_type === "movie" || m.media_type === "tv") && (m.backdrop_path || m.poster_path))
            .map((m) => normalizeMovie(m));
        } else {
          // demo mode: search the local titles
          list = localMovies
            .filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))
            .map(normalizeLocal);
        }
        if (!cancelled) setResults(list);
      } catch (err) {
        console.error("Search failed:", err.message);
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setDone(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className={classes.page}>
      <h1 className={classes.heading}>Results for “{query}”</h1>
      {done && results.length > 0 && <Toolbar {...toolbar} />}
      {done ? (
        <Grid
          items={visible}
          empty={
            results.length
              ? "Nothing matches these filters. Try All or All genres."
              : `No titles match “${query}”. Try another name.`
          }
        />
      ) : null}
    </div>
  );
}

export default SearchResults;
