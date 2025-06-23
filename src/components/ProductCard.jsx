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
    <article className="card h-100 product-card" aria-label={`Producto ${product.title}`}>
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
          <p 
            className="text-center fw-bold text-dark"
            aria-label={`Precio ${Number(product.price).toFixed(2)} dólares`}
          >
            ${Number(product.price).toFixed(2)}
          </p>
        </div>
        <div className="d-grid gap-2 mt-3">
          <button
            className="btn btn-dark w-100"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            aria-disabled={product.stock === 0}
            aria-label={
              product.stock === 0
                ? `${product.title} sin stock`
                : `Agregar ${product.title} al carrito`
            }
          >
            {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
          </button>
          <button
            className="btn btn-outline-dark w-100"
            onClick={handleViewMore}
            aria-label={`Ver más detalles de ${product.title}`}
          >
            Ver Más
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;


















