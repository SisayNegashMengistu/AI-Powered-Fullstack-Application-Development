import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import classes from "./Footer.module.css";

const SOCIAL = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaYoutube, label: "YouTube" },
];

// listed in reading order; the 4-column grid fills row by row
const LINKS = [
  "Audio Description", "Help Centre", "Gift Cards", "Media Centre",
  "Investor Relations", "Jobs", "Terms of Use", "Privacy",
  "Legal Notices", "Cookie Preferences", "Corporate Information", "Contact Us",
];

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <div className={classes.social}>
          {SOCIAL.map(({ icon: Icon, label }) => (
            <a key={label} href="#" aria-label={label}>
              <Icon size={22} />
            </a>
          ))}
        </div>

        <ul className={classes.links}>
          {LINKS.map((l) => (
            <li key={l}>
              <a href="#">{l}</a>
            </li>
          ))}
        </ul>

        <p className={classes.copy}>© 1997–{new Date().getFullYear()} Netflix, Inc.</p>
        <p className={classes.copy}>
          This is a learning project, not affiliated with Netflix. Movie data and images are from TMDB;
          this product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
