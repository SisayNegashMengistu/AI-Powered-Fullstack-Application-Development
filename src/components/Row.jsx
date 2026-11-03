import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import axios from "../utils/axios";
import { hasApiKey } from "../utils/requests";
import { normalizeLocal, normalizeMovie } from "../utils/constants";
import Card from "./Card";
import classes from "./SlideShow.module.css";

// A titled, scrollable row of cards.
//  - with an API key it requests `fetchUrl` from TMDB
//  - without one it shows `localMovies` so the UI can still be built and styled
//  - `mediaType` ('tv' | 'movie') is the fallback for endpoints that don't say which it is
function Row({ title, fetchUrl, localMovies = [], mediaType }) {
  const [movies, setMovies] = useState(hasApiKey ? [] : localMovies.map(normalizeLocal));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hasApiKey || !fetchUrl) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await axios.get(fetchUrl);
        const list = res.data.results
          .filter((m) => m.backdrop_path || m.poster_path)
          .map((m) => normalizeMovie(m, mediaType));
        if (!cancelled) setMovies(list);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fetchUrl, mediaType]);

  if (error) {
    return (
      <section className={classes.Row}>
        <h2 className={classes.title}>{title}</h2>
        <p className={classes.error}>Couldn't load this row: {error}</p>
      </section>
    );
  }

  if (!movies.length) return null;

  return (
    <section className={classes.Row}>
      <h2 className={classes.title}>{title}</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView="auto"
        spaceBetween={44}
        slidesPerGroupAuto
        grabCursor
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.key}>
            <Card movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Row;
