import { useEffect, useState } from "react";
import { IoPlayOutline, IoInformationCircleOutline } from "react-icons/io5";
import axios from "../utils/axios";
import requests, { hasApiKey } from "../utils/requests";
import { BANNER_BASE, normalizeMovie, truncate } from "../utils/constants";
import { useApp } from "../context/AppContext";
import logo from "../assets/image/logo-trim.png";
import bannerImg from "../assets/image/banner.jpeg";
import classes from "./Banner.module.css";

// Shown when there is no API key (or the request fails), matching the design reference.
// 91239 is Bridgerton's id on TMDB, so with a key its Play button still finds a trailer.
const FALLBACK = {
  key: "tv-91239",
  id: 91239,
  media_type: "tv",
  title: "Bridgerton",
  overview:
    "Shondaland's Emmy-winning series brings Julia Quinn's novels to life, as eight siblings seek their perfect match amid London's scandals and soirées.",
  image: bannerImg,
  poster_path: bannerImg,
  backdrop: bannerImg,
  genres: ["Drama", "Romance"],
  matureRating: "U/A 16+",
  category: "TV",
  quality: "HD",
  badge: "",
  rating: 0,
  date: "",
};

function Banner() {
  const [movie, setMovie] = useState(FALLBACK);
  const { inList, toggleList, openDetails } = useApp();

  useEffect(() => {
    if (!hasApiKey) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await axios.get(requests.fetchNetflixOriginals);
        const withArt = res.data.results.filter((m) => m.backdrop_path);
        const pick = withArt[Math.floor(Math.random() * withArt.length)];
        if (!cancelled && pick) {
          setMovie({ ...normalizeMovie(pick, "tv"), image: BANNER_BASE + pick.backdrop_path });
        }
      } catch (err) {
        console.error("Banner request failed:", err.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const saved = inList(movie);

  return (
    <section
      className={classes.banner}
      style={{ backgroundImage: `url(${movie.image})` }}
      aria-label="Featured title"
    >
      <div className={classes.content}>
        <img className={classes.badge} src={logo} alt="Netflix" />
        <h1 className={classes.title}>{movie.title}</h1>
        <p className={classes.description}>{truncate(movie.overview, 180)}</p>

        <div className={classes.buttons}>
          <button className={classes.btn} onClick={() => openDetails(movie, true)}>
            <IoPlayOutline size={30} />
            Play
          </button>
          <button className={classes.btn} onClick={() => toggleList(movie)} aria-pressed={saved}>
            <IoInformationCircleOutline size={30} />
            {saved ? "In My List" : "My List"}
          </button>
        </div>
      </div>
      <div className={classes.fadeBottom} />
    </section>
  );
}

export default Banner;
