// Gallery.jsx
import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Paginator from '../components/Paginator';
import Slider from 'react-slick';

// Importar los estilos slick-carousel obligatorios
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Gallery({ searchTerm }) {
  const { products } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);

      const minCardWidth = 280;
      const possibleItems = Math.floor(width / minCardWidth);
      const newItemsPerPage = Math.min(Math.max(possibleItems, 1), 4);
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const normalizeText = (text) =>
    text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const normalizedSearch = normalizeText(searchTerm);
    return products.filter(product =>
      normalizeText(product.title).includes(normalizedSearch)
    );
  }, [products, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const pageTitle = searchTerm
    ? `Buscar: "${searchTerm}" | Robots Store`
    : 'Catálogo de Robots | Robots Store';

  const pageDescription = searchTerm
    ? `Resultados de búsqueda para "${searchTerm}" en el catálogo de robots inteligentes.`
    : 'Explorá nuestro catálogo de robots inteligentes y tecnológicos.';

  // Configuración slider móvil con flechas visibles
  const sliderSettings = {
    dots: false,          // SIN puntitos
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,         // MOSTRAR flechas predeterminadas
    swipeToSlide: true,
  };

  return (
    <div className="container mt-4" aria-label="Galería de productos">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <h2
        className="text-center text-uppercase fw-bold text-dark"
        role="heading"
        aria-level="1"
        style={{ marginTop: '1rem', marginBottom: '-2rem' }}
      >
        Catálogo de Robots
      </h2>

      <div className="row g-4 mt-4">
        {isMobile ? (
          <Slider {...sliderSettings}>
            {filteredProducts.map(product => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        ) : (
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

      {!isMobile && (
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






















