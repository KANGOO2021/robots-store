import React from 'react';

function Paginator({ currentPage, totalPages, onPageChange }) {
  // Cambia a la página anterior si no es la primera
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  // Cambia a la página siguiente si no es la última
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav aria-label="Paginación del catálogo">
      <ul className="pagination justify-content-center my-4">
        {/* Botón anterior */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" aria-label="Página anterior" onClick={handlePrevious}>
            &laquo;
          </button>
        </li>

        {/* Botones numéricos de página */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
          <li
            key={pageNum}
            className={`page-item ${currentPage === pageNum ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(pageNum)}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          </li>
        ))}

        {/* Botón siguiente */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" aria-label="Página siguiente" onClick={handleNext}>
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Paginator;





