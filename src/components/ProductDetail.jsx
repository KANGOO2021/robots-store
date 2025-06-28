import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

/**
 * Componente que muestra los detalles de un producto seleccionado.
 * Permite agregarlo al carrito y volver a la galería.
 */
function ProductDetail() {
  const { id } = useParams();
  const { getProductById } = useProduct();
  const { addToCart } = useCart();

  // Busca el producto por su ID desde el contexto de productos
  const product = getProductById(id);

  /**
   * Al montar el componente, se hace scroll al inicio de la página.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!product) {
    return (
      <div className="text-center mt-5" role="alert" aria-live="assertive">
        Producto no encontrado
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.title} - Robots Store</title>
        <meta
          name="description"
          content={product.description || 'Detalle del producto en Robots Store'}
        />
      </Helmet>

      <main className="container my-5" role="main" aria-label={`Detalle del producto ${product.title}`}>
        <h2 className="text-center mb-4">{product.title}</h2>
        <div className="row">
          {/* Imagen del producto */}
          <div className="col-md-5 d-flex justify-content-center align-items-start">
            <div
              className="w-100"
              style={{
                maxWidth: '400px',
                height: '300px',
                borderRadius: '0.5rem',
                overflow: 'hidden',
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-100 h-100"
                style={{
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                }}
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="col-md-7 d-flex flex-column justify-content-between">
            <div>
              <p
                className="lead"
                style={{
                  textAlign: 'justify',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                }}
              >
                {product.details || product.description}
              </p>
            </div>

            <div className="mt-auto text-center">
              <h4 className="mb-3" aria-label={`Precio: ${product.price.toFixed(2)} dólares`}>
                ${product.price.toFixed(2)}
              </h4>
              <button
                onClick={() => addToCart(product)}
                className="btn btn-primary mb-3 px-4"
                style={{ width: '50%' }}
                aria-label={`Agregar ${product.title} al carrito`}
              >
                Agregar al carrito
              </button>
              <div>
                <Link to="/gallery" className="btn btn-outline-dark w-50" aria-label="Volver a la galería de productos">
                  ← Volver a la galería
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductDetail;
















