import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { useMemo } from 'react';

function Gallery({ searchTerm }) {
  const { products } = useProduct();

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-uppercase font-weight-bold text-dark">
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
            <p>No hay productos disponibles que coincidan con la búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;










