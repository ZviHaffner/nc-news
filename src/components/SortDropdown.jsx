import { useState } from "react";

export const SortDropdown = ({ articles }) => {
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  function handleReset() {
    setSortBy("");
    setOrder("");
  }

  return (
    <form className="sort-form">
      <select
        name="sort_by"
        value={sortBy}
        onChange={(event) => {
          setSortBy(event.target.value);
        }}
      >
        <option value="" disabled>
          Sort By...
        </option>
        {Object.keys(articles[0]).map((key) => {
          if (key === "article_img_url" || key === "comment_count") {
            return null;
          }
          const sortQuery = key.split("_");
          const capitalisedSortQuery = [];
          for (let word of sortQuery) {
            if (word === "id") {
              capitalisedSortQuery.push("ID");
            } else {
              capitalisedSortQuery.push(
                word.charAt(0).toUpperCase() + word.slice(1)
              );
            }
          }
          const sortQueryStr = capitalisedSortQuery.join(" ");
          return (
            <option value={key} key={key}>
              {sortQueryStr}
            </option>
          );
        })}
      </select>
      <select
        name="order"
        value={order}
        onChange={(e) => {
          setOrder(e.target.value);
        }}
      >
        <option value="" disabled>
          Order...
        </option>
        <option value={"asc"}>Ascending</option>
        <option value={"desc"}>Descending</option>
      </select>
      <button type="submit">SORT</button>
      <button onClick={handleReset}>RESET</button>
    </form>
  );
};
