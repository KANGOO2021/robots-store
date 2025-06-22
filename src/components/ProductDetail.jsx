import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

function ProductDetail() {
  const { id } = useParams();
  const { products } = useProduct();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id.toString() === id);

  // Forzar scroll al top al montar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!product) {
    return <div className="text-center mt-5">Producto no encontrado</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{product.title}</h2>
      <div className="row">
        {/* Imagen */}
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

        {/* Detalle */}
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
            <h4 className="mb-3">${product.price.toFixed(2)}</h4>
            <button
              onClick={() => addToCart(product)}
              className="btn btn-primary mb-3 px-4"
              style={{ width: '50%' }}
            >
              Agregar al carrito
            </button>
            <div>
              <Link to="/gallery" className="btn btn-outline-dark w-50">
                ← Volver a la galería
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;













