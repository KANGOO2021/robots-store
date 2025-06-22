import React from 'react';

function SearchBar({ searchTerm, onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <form
      className="d-flex me-3"
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="form-control"
        type="search"
        placeholder="Buscar productos"
        aria-label="Buscar"
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
}

export default SearchBar;
