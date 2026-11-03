import { useEffect, useRef, useState } from "react";
import { IoPlay, IoStop, IoAdd, IoCheckmark, IoClose } from "react-icons/io5";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import axios from "../utils/axios";
import { detailsUrl, hasApiKey } from "../utils/requests";
import { formatRuntime, normalizeMovie, pickTrailer } from "../utils/constants";
import { useApp } from "../context/AppContext";
import classes from "./DetailsModal.module.css";

// Wrapper: renders nothing until a title is selected. `key` makes React start a
// fresh modal (new fetch, scrolled to top) whenever the selected title changes.
function DetailsModal() {
  const { selected } = useApp();
  if (!selected) return null;
  return <Modal key={selected.movie.key} movie={selected.movie} autoplay={selected.autoplay} />;
}

function Modal({ movie, autoplay }) {
  const { closeDetails, openDetails, inList, toggleList, isLiked, toggleLike } = useApp();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(hasApiKey && !movie.local);
  const [playing, setPlaying] = useState(autoplay);
  const closeRef = useRef(null);

  const live = hasApiKey && !movie.local; // demo titles have no TMDB record

  // load details + trailers + cast + similar titles in one request
  useEffect(() => {
    if (!live) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(detailsUrl(movie.media_type, movie.id));
        if (!cancelled) setDetails(res.data);
      } catch (err) {
        console.error("Details request failed:", err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [live, movie.media_type, movie.id]);

  // Esc closes, page behind stops scrolling while the window is open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeDetails();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [closeDetails]);

  const trailer = pickTrailer(details?.videos?.results);
  const saved = inList(movie);
  const liked = isLiked(movie);

  const year = (details?.release_date || details?.first_air_date || movie.date || "").slice(0, 4);
  const length =
    movie.media_type === "tv"
      ? details?.number_of_seasons
        ? `${details.number_of_seasons} Season${details.number_of_seasons > 1 ? "s" : ""}`
        : ""
      : formatRuntime(details?.runtime);
  const rating = details?.vote_average ?? movie.rating;
  const genres = details?.genres?.map((g) => g.name) || movie.genres;
  const cast = details?.credits?.cast?.slice(0, 5).map((c) => c.name) || [];
  const similar = (details?.recommendations?.results || [])
    .filter((m) => m.backdrop_path || m.poster_path)
    .slice(0, 6)
    .map((m) => normalizeMovie(m, movie.media_type));
  const overview =
    details?.overview ||
    movie.overview ||
    (live ? "" : "Add your TMDB API key to see the full synopsis, cast and trailer for this title.");

  // what the video area says when there is nothing to play yet
  let playerNote = "";
  if (playing && !trailer) {
    if (!live) playerNote = "Trailers need a TMDB API key. Add one to your .env file.";
    else if (loading) playerNote = "Loading trailer…";
    else playerNote = "No trailer is available for this title.";
  }

  return (
    <div className={classes.overlay} onMouseDown={(e) => e.target === e.currentTarget && closeDetails()}>
      <div className={classes.modal} role="dialog" aria-modal="true" aria-label={movie.title}>
        <button ref={closeRef} className={classes.close} onClick={closeDetails} aria-label="Close">
          <IoClose size={22} />
        </button>

        <div className={classes.hero}>
          {playing && trailer ? (
            <iframe
              className={classes.video}
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1`}
              title={`${movie.title} trailer`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <>
              {movie.backdrop && <img className={classes.backdrop} src={movie.backdrop} alt="" />}
              <div className={classes.heroFade} />
              <h2 className={classes.heroTitle}>{movie.title}</h2>
              {playerNote && <p className={classes.playerNote}>{playerNote}</p>}
            </>
          )}
        </div>

        <div className={classes.body}>
          <div className={classes.actions}>
            <button className={classes.playBtn} onClick={() => setPlaying((p) => !p)}>
              {playing ? <IoStop size={20} /> : <IoPlay size={20} />}
              {playing ? "Stop" : "Play trailer"}
            </button>
            <button
              className={classes.round}
              onClick={() => toggleList(movie)}
              aria-pressed={saved}
              aria-label={saved ? "Remove from My List" : "Add to My List"}
              title={saved ? "Remove from My List" : "Add to My List"}
            >
              {saved ? <IoCheckmark size={22} /> : <IoAdd size={24} />}
            </button>
            <button
              className={classes.round}
              onClick={() => toggleLike(movie)}
              aria-pressed={liked}
              aria-label={liked ? "Unlike" : "Like"}
              title={liked ? "Unlike" : "Like"}
            >
              {liked ? <FaThumbsUp size={15} /> : <FaRegThumbsUp size={15} />}
            </button>
          </div>

          <div className={classes.columns}>
            <div className={classes.main}>
              <p className={classes.metaLine}>
                {rating > 0 && <span className={classes.match}>{Math.round(rating * 10)}% Match</span>}
                {year && <span>{year}</span>}
                {length && <span>{length}</span>}
                <span className={classes.pill}>{movie.matureRating}</span>
                <span className={classes.pill}>{movie.quality}</span>
              </p>
              {details?.tagline && <p className={classes.tagline}>{details.tagline}</p>}
              <p className={classes.overview}>{overview}</p>
            </div>

            <dl className={classes.side}>
              {cast.length > 0 && (
                <>
                  <dt>Cast:</dt>
                  <dd>{cast.join(", ")}</dd>
                </>
              )}
              {genres.length > 0 && (
                <>
                  <dt>Genres:</dt>
                  <dd>{genres.join(", ")}</dd>
                </>
              )}
              <dt>This is:</dt>
              <dd>{movie.category === "TV" ? "A TV show" : "A movie"}</dd>
            </dl>
          </div>

          {similar.length > 0 && (
            <section>
              <h3 className={classes.moreTitle}>More like this</h3>
              <div className={classes.similar}>
                {similar.map((s) => (
                  <button key={s.key} className={classes.tile} onClick={() => openDetails(s)}>
                    <img src={s.poster_path} alt="" loading="lazy" />
                    <span>{s.title}</span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsModal;
