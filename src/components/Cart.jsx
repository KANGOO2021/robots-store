import { Link } from 'react-router-dom';

function Cart({ cart, updateQuantity, removeFromCart, clearCart, finishPurchase, calculateTotal }) {
  return (
    <div className="container mt-4">
      <h2>Mi Carrito</h2>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="fw-bold text-danger">Tu carrito está vacío.</p>
          <Link
            to="/gallery"
            className="btn btn-dark btn-lg mt-3"
            style={{ color: "#39FF14", borderColor: "#39FF14" }}
          >
            Ir a la Galería y seguir comprando
          </Link>
        </div>
      ) : (
        <>
          <div className="list-group">
            {cart.map((item) => (
              <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "10px" }}
                  />
                  <div>
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="mb-0">
                      ${item.price.toFixed(2)} x {item.quantity} ={" "}
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn btn-outline-secondary me-2" onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="btn btn-outline-secondary ms-2" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  <button className="btn btn-danger ms-3" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: <span className="text-success">${calculateTotal().toFixed(2)}</span></h4>
            <div className="d-flex gap-3">
              <button className="btn btn-outline-danger" onClick={clearCart}>Vaciar Carrito</button>
              <button className="btn btn-success" onClick={finishPurchase}>Finalizar Compra</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;






















