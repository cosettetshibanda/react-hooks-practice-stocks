import React from "react";

function SearchBar({sortStocks, sortBy, handleFilterChange}) {

  function onFilterChange(event) {
    handleFilterChange(event.target.value);
  }

  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input
          type="radio"
          value="Alphabetically"
          name="sort"
          checked={ sortBy === "Alphabetically"}
          onChange={sortStocks}
        />
        Alphabetically
      </label>
      <label>
        <input
          type="radio"
          value="Price"
          name="sort"
          checked={ sortBy === "Price"}
          onChange={sortStocks}
        />
        Price
      </label>
      <br />
      <label>
        <strong>Filter:</strong>
        <select onChange={onFilterChange}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
