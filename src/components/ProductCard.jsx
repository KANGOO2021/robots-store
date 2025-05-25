import { useNavigate } from 'react-router-dom';

/**
 * Componente que representa una tarjeta individual de producto.
 * Muestra imagen, título, descripción, precio, y permite agregar al carrito o ver más detalles.
 *
 * Props:
 * - product: objeto con los datos del producto (id, title, description, image, price)
 * - addToCart: función para agregar el producto al carrito
 */
function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  // Agrega el producto al carrito con cantidad inicial 1
  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  // Navega a la página de detalle del producto
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
            ${product.price.toFixed(2)}
          </p>
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







