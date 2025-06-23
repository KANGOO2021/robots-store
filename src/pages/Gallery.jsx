import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet';

function Gallery({ searchTerm }) {
  const { products } = useProduct();

  const normalizeText = (text) =>
    text
      .normalize("NFD")               // descompone letras y tildes
      .replace(/[\u0300-\u036f]/g, '') // remueve los signos diacríticos (acentos)
      .toLowerCase();

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const normalizedSearch = normalizeText(searchTerm);
    return products.filter(product =>
      normalizeText(product.title).includes(normalizedSearch)
    );
  }, [products, searchTerm]);

  const pageTitle = searchTerm
    ? `Buscar: "${searchTerm}" | Robots Store`
    : 'Catálogo de Robots | Robots Store';

  const pageDescription = searchTerm
    ? `Resultados de búsqueda para "${searchTerm}" en el catálogo de robots inteligentes.`
    : 'Explorá nuestro catálogo de robots inteligentes y tecnológicos.';

  return (
    <div className="container mt-4" aria-label="Galería de productos">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

    <h2
  className="text-center text-uppercase font-weight-bold text-dark"
  role="heading"
  aria-level="1"
  style={{ marginTop: '1rem', marginBottom: '-2rem' }}
>
  Catálogo de Robots
</h2>

      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p aria-live="polite">
              No hay productos disponibles que coincidan con la búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;












