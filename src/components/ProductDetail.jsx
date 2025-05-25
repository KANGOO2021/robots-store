import { useParams, Link } from 'react-router-dom';

/**
 * Componente que muestra los detalles ampliados de un producto individual.
 * Utiliza el parámetro de la URL para identificar el producto a mostrar.
 *
 * Props:
 * - products: array de productos disponibles
 */
function ProductDetail({ products }) {
  const { id } = useParams();

  // Busca el producto por su ID
  const product = products.find(p => p.id.toString() === id);

  // Muestra mensaje si no se encuentra el producto
  if (!product) {
    return <div className="text-center mt-5">Producto no encontrado</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{product.title}</h2>

      <div className="row align-items-start">
        {/* Imagen del producto */}
        <div className="col-md-5 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>

        {/* Descripción técnica detallada */}
        <div className="col-md-7">
          <p className="lead">{product.details}</p>
        </div>
      </div>

      {/* Botón para regresar a la galería */}
      <div className="text-center mt-5">
        <Link to="/gallery" className="btn btn-outline-dark">
          ← Volver a la galería
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;




