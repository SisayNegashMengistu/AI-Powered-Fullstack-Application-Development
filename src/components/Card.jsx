import { IoPlay, IoAdd, IoCheckmark, IoChevronDown } from "react-icons/io5";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import classes from "./Card.module.css";

// One poster. At rest it shows only the image; on hover/focus it grows into the
// detail panel from the "7.HoverEffectOnCard" design. Click anywhere to open details.
function Card({ movie }) {
  const { inList, isLiked, toggleList, toggleLike, openDetails } = useApp();
  const saved = inList(movie);
  const liked = isLiked(movie);

  // buttons act on their own; they must not also open the details window
  const only = (fn) => (e) => {
    e.stopPropagation();
    fn();
  };

  return (
    <div
      className={classes.card}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && e.target === e.currentTarget && openDetails(movie)}
    >
      <div className={classes.inner} onClick={() => openDetails(movie)}>
        <img className={classes.poster} src={movie.poster_path} alt={movie.title} loading="lazy" />

        <div className={classes.details}>
          {movie.badge && <span className={classes.badge}>{movie.badge}</span>}

          <div className={classes.actions}>
            <div className={classes.actionsLeft}>
              <button
                className={classes.round}
                onClick={only(() => openDetails(movie, true))}
                aria-label={`Play ${movie.title}`}
              >
                <IoPlay size={16} />
              </button>
              <button
                className={classes.round}
                onClick={only(() => toggleList(movie))}
                aria-label={saved ? `Remove ${movie.title} from My List` : `Add ${movie.title} to My List`}
                aria-pressed={saved}
              >
                {saved ? <IoCheckmark size={20} /> : <IoAdd size={22} />}
              </button>
              <button
                className={classes.round}
                onClick={only(() => toggleLike(movie))}
                aria-label={liked ? `Unlike ${movie.title}` : `Like ${movie.title}`}
                aria-pressed={liked}
              >
                {liked ? <FaThumbsUp size={13} /> : <FaRegThumbsUp size={13} />}
              </button>
            </div>
            <button
              className={`${classes.round} ${classes.more}`}
              onClick={only(() => openDetails(movie))}
              aria-label={`More info about ${movie.title}`}
            >
              <IoChevronDown size={18} />
            </button>
          </div>

          <p className={classes.meta}>
            <span>{movie.matureRating}</span>
            <span>{movie.category}</span>
            <span>{movie.quality}</span>
          </p>

          <ul className={classes.genres}>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card;
