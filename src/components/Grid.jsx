import Card from "./Card";
import classes from "./Grid.module.css";

// Wrapping grid of cards, used by the search results and My List pages.
function Grid({ items, empty }) {
  if (!items.length) return <p className={classes.empty}>{empty}</p>;
  return (
    <div className={classes.grid}>
      {items.map((m) => (
        <Card key={m.key} movie={m} />
      ))}
    </div>
  );
}

export default Grid;
