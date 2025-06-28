import React from 'react';

/**
 * Barra de búsqueda reutilizable.
 * Recibe el término de búsqueda y una función para actualizarlo.
 */
function SearchBar({ searchTerm, onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <form
      className="d-flex me-3"
      role="search"
      aria-label="Formulario de búsqueda de productos"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="search-input" className="visually-hidden">
        Buscar productos
      </label>
      <input
        id="search-input"
        className="form-control"
        type="search"
        placeholder="Buscar productos"
        aria-label="Buscar productos"
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
}

export default SearchBar;


