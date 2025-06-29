import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  /**
   * Agrega el producto actual al carrito de compras
   */
  const handleAddToCart = () => {
    addToCart(product);
  };

  /**
   * Navega a la página de detalles del producto
   */
  const handleViewMore = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <>
      {/* Helmet para cambiar título al ver un producto (opcional) */}
      <Helmet>
        <title>Detalle de {product.title} | Robots Store</title>
        <meta name="description" content={`Detalles y características del producto ${product.title}`} />
      </Helmet>

      <article
        className="card h-100 product-card"
        aria-label={`Producto ${product.title}`}
        role="region"
        tabIndex={0}
      >
        {/* Imagen del producto con descripción accesible */}
        <img
          src={product.image}
          alt={product.title}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />

        <div className="card-body d-flex flex-column justify-content-between">
          <div className="card-content">
            {/* Título del producto */}
            <h5 className="card-title fixed-title">{product.title}</h5>

            {/* Descripción breve */}
            <p className="card-text fixed-description">{product.description}</p>

            {/* Precio con etiqueta aria para lectores de pantalla */}
            <p
              className="text-center fw-bold text-dark fixed-price"
              aria-label={`Precio ${Number(product.price).toFixed(2)} dólares`}
            >
              ${Number(product.price).toFixed(2)}
            </p>
          </div>

          {/* Botones de acción para añadir al carrito o ver más detalles */}
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
              type="button"
            >
              {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </button>

            <button
              className="btn btn-outline-dark w-100"
              onClick={handleViewMore}
              aria-label={`Ver más detalles de ${product.title}`}
              type="button"
            >
              Ver Más
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

export default ProductCard;





















