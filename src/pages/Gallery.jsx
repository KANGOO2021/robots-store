import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Paginator from '../components/Paginator';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/**
 * Componente para la flecha siguiente del slider con accesibilidad
 */
function NextArrow(props) {
  const { className, style, onClick, currentSlide, slideCount } = props;
  const isDisabled = currentSlide === slideCount - 1;

  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDisabled ? '#ccc' : '#666',
        borderRadius: '50%',
        width: 30,
        height: 30,
        right: 5,
        zIndex: 1000,
        cursor: isDisabled ? 'default' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
      }}
      onClick={isDisabled ? null : onClick}
      aria-disabled={isDisabled}
      aria-label="Siguiente"
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) onClick(); }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <path d="M8 5l8 7-8 7V5z" />
      </svg>
    </div>
  );
}

/**
 * Componente para la flecha anterior del slider con accesibilidad
 */
function PrevArrow(props) {
  const { className, style, onClick, currentSlide } = props;
  const isDisabled = currentSlide === 0;

  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDisabled ? '#ccc' : '#666',
        borderRadius: '50%',
        width: 30,
        height: 30,
        left: 5,
        zIndex: 1000,
        cursor: isDisabled ? 'default' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
      }}
      onClick={isDisabled ? null : onClick}
      aria-disabled={isDisabled}
      aria-label="Anterior"
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) onClick(); }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <path d="M16 19l-8-7 8-7v14z" />
      </svg>
    </div>
  );
}

/**
 * Componente principal Gallery que muestra una galería de productos
 * con paginación y slider para dispositivos móviles.
 */
function Gallery({ searchTerm }) {
  const { products } = useProduct(); // Obtiene productos desde el contexto
  const [currentPage, setCurrentPage] = useState(1); // Página actual para paginación
  const [itemsPerPage, setItemsPerPage] = useState(4); // Cantidad de productos por página
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detecta si es dispositivo móvil

  // Detecta cambios en el tamaño de pantalla para ajustar items por página y diseño responsive
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      const minCardWidth = 280;
      const possibleItems = Math.floor(width / minCardWidth);
      // Limita cantidad entre 1 y 4 para que no se rompa el diseño
      const newItemsPerPage = Math.min(Math.max(possibleItems, 1), 4);
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1); // Resetea página al cambiar tamaño
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  /**
   * Normaliza texto para comparar sin tildes ni mayúsculas
   * @param {string} text
   * @returns {string}
   */
  const normalizeText = (text) =>
    text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  // Filtra productos por término de búsqueda normalizado
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const normalizedSearch = normalizeText(searchTerm);
    return products.filter(product =>
      normalizeText(product.title).includes(normalizedSearch)
    );
  }, [products, searchTerm]);

  // Calcula el total de páginas según cantidad filtrada y items por página
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  // Índice inicial para slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  // Productos a mostrar en la página actual
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Resetea a página 1 cada vez que cambia el término de búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Título y descripción dinámica para SEO
  const pageTitle = searchTerm
    ? `Buscar: "${searchTerm}" | Robots Store`
    : 'Catálogo de Robots | Robots Store';

  const pageDescription = searchTerm
    ? `Resultados de búsqueda para "${searchTerm}" en el catálogo de robots inteligentes.`
    : 'Explorá nuestro catálogo de robots inteligentes y tecnológicos.';

  // Configuraciones para el slider en móvil
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="container mt-4" aria-label="Galería de productos">
      {/* Helmet para SEO y accesibilidad */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      {/* Título principal con roles para accesibilidad */}
      <h2
        className="text-center text-uppercase fw-bold text-dark"
        role="heading"
        aria-level="1"
        style={{ marginTop: '1rem', marginBottom: '-2rem' }}
      >
        Catálogo de Robots
      </h2>

      <div className="row g-4 mt-4">
        {filteredProducts.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-warning text-center" role="status">
              No se encontraron resultados para "<strong>{searchTerm}</strong>"
            </div>
          </div>
        ) : isMobile ? (
          // Muestra slider para dispositivos móviles
          <Slider {...sliderSettings} aria-label="Slider de productos">
            {filteredProducts.map(product => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        ) : (
          // Muestra productos en grilla para escritorio
          currentProducts.map(product => (
            <div
              key={product.id}
              className={
                itemsPerPage === 1 ? 'col-12' :
                itemsPerPage === 2 ? 'col-6' :
                itemsPerPage === 3 ? 'col-md-4 col-sm-6 col-12' :
                'col-lg-3 col-md-4 col-sm-6 col-12'
              }
            >
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>

      {/* Paginación visible solo en desktop y si hay productos */}
      {!isMobile && filteredProducts.length > 0 && (
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default Gallery;





























