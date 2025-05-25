import ProductCard from '../components/ProductCard';

// Página que muestra el catálogo completo de robots y permite agregar productos al carrito
function Gallery({ products, addToCart }) {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-uppercase font-weight-bold text-dark">Catálogo de Robots</h2>
      <div className="row g-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={product} addToCart={addToCart} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>Cargando productos...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;



