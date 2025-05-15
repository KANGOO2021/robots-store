function ProductCard({ product, addToCart }) {
  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
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
        <button className="btn btn-dark w-100 mt-3" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;




