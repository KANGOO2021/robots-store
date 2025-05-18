import { useNavigate } from 'react-router-dom';

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleViewMore = () => {
    // Navegar a la ruta dinámica con el id del producto
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="card h-100 product-card">
      <img
        src={product.image}
        alt={product.title}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <p className="text-center fw-bold text-dark">${product.price.toFixed(2)}</p>
        </div>
        <div className="d-grid gap-2 mt-3">
          <button className="btn btn-dark w-100" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
          <button className="btn btn-outline-dark w-100" onClick={handleViewMore}>
            Ver Más
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;






