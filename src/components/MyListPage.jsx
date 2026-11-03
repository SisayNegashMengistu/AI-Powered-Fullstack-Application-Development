import { useApp } from "../context/AppContext";
import Grid from "./Grid";
import Toolbar, { useBrowseView } from "./Toolbar";
import classes from "./Page.module.css";

const SORTS = [
  { value: "default", label: "Recently added" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
  { value: "rating", label: "Highest rated" },
  { value: "newest", label: "Newest first" },
];

function MyListPage() {
  const { list, liked } = useApp();
  const mine = useBrowseView(list);

  return (
    <div className={classes.page}>
      <h1 className={classes.heading}>My List</h1>
      {list.length > 0 && <Toolbar {...mine.toolbar} sorts={SORTS} />}
      <Grid
        items={mine.visible}
        empty={
          list.length
            ? "Nothing matches these filters."
            : "Nothing saved yet. Use the + button on any title to add it here."
        }
      />

      {liked.length > 0 && (
        <>
          <h2 className={classes.subheading}>Titles you liked</h2>
          <Grid items={liked} empty="" />
        </>
      )}
    </div>
  );
}

export default MyListPage;
