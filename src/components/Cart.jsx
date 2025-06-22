import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProduct } from '../context/ProductContext';
import { toast } from 'react-toastify';

function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    calculateTotal,
  } = useCart();

  const { decreaseStock, getProductById } = useProduct();

  const finishPurchase = async () => {
    if (cart.length === 0) {
      toast.warn('El carrito está vacío');
      return;
    }

    try {
      // Validar stock actualizado antes de descontar
      for (const item of cart) {
        const product = getProductById(item.id);
        if (!product) {
          toast.error(`El producto ${item.title} no existe.`);
          return;
        }
        if (item.quantity > product.stock) {
          toast.error(`No hay suficiente stock para ${item.title}.`);
          return;
        }
      }

      // Descontar stock en paralelo
      await Promise.all(cart.map(item => decreaseStock(item.id, item.quantity)));

      clearCart();
      toast.success('¡Gracias por tu compra!');
    } catch (error) {
      toast.error('Ocurrió un error al finalizar la compra.');
      console.error(error);
    }
  };

  return (
    <main className="cart-main container mt-4">
      <h2>Mi Carrito</h2>

      {cart.length === 0 ? (
        <div className="text-center empty-cart">
          <p className="fw-bold text-danger fs-4">Tu carrito está vacío.</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Carrito vacío"
            className="empty-cart-img"
          />
          <Link
            to="/gallery"
            className="btn btn-dark btn-lg mt-3 explore-btn"
          >
            Ir a la Galería y seguir comprando
          </Link>
        </div>
      ) : (
        <>
          <div className="list-group">
            {cart.map((item) => (
              <div
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      marginRight: '10px',
                    }}
                  />
                  <div>
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="mb-0">
                      ${item.price.toFixed(2)} x {item.quantity} ={' '}
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="btn btn-outline-secondary ms-2"
                    onClick={() => {
                      const product = getProductById(item.id);
                      if (product && item.quantity < product.stock) {
                        updateQuantity(item.id, 1);
                      } else {
                        toast.warn('Stock máximo alcanzado');
                      }
                    }}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>
              Total: <span className="text-success">${calculateTotal().toFixed(2)}</span>
            </h4>
            <div className="d-flex gap-3">
              <button className="btn btn-outline-danger" onClick={() => clearCart()}>
                Vaciar Carrito
              </button>
              <button className="btn btn-success" onClick={finishPurchase}>
                Finalizar Compra
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;



































