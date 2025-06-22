import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleViewMore = () => {
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
          <p className="text-center fw-bold text-dark">
            ${Number(product.price).toFixed(2)}
          </p>
        </div>
        <div className="d-grid gap-2 mt-3">
          <button
            className="btn btn-dark w-100"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
          </button>
          <button
            className="btn btn-outline-dark w-100"
            onClick={handleViewMore}
          >
            Ver Más
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

















