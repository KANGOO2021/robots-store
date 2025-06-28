import React from 'react';

function Paginator({ currentPage, totalPages, onPageChange }) {
  // Para mostrar hasta 5 botones (o menos si pocas páginas)
  // Siempre mostrar flechas y botones numéricos de páginas
  // Aquí simplifico mostrando todos los números
  // Podés mejorar mostrando los 3 en medio y ... si querés

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav aria-label="Paginación del catálogo">
      <ul className="pagination justify-content-center my-4">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" aria-label="Página anterior" onClick={handlePrevious}>
            &laquo;
          </button>
        </li>

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




