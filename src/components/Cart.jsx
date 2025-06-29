import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProduct } from '../context/ProductContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    calculateTotal,
  } = useCart();

  const { decreaseStock, getProductById } = useProduct();

  // Finaliza la compra si hay stock suficiente y limpia el carrito
  const finishPurchase = async () => {
    if (cart.length === 0) {
      toast.warn('El carrito está vacío');
      return;
    }

    try {
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

      await Promise.all(cart.map(item => decreaseStock(item.id, item.quantity)));
      clearCart();
      toast.success('¡Gracias por tu compra!');
    } catch (error) {
      toast.error('Ocurrió un error al finalizar la compra.');
      console.error('Error al finalizar la compra:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Carrito de Compras - Robots Store</title>
        <meta
          name="description"
          content="Revisa y gestiona los productos en tu carrito de compras en Robots Store. ¡Compra robots inteligentes con facilidad!"
        />
      </Helmet>

      <main className="cart-main container mt-4" role="main" aria-label="Carrito de compras">
        <h1 className="text-center mb-4" aria-level="1">Mi Carrito</h1>

        {cart.length === 0 ? (
          <div className="text-center empty-cart" role="alert" aria-live="polite">
            <p className="fw-bold text-danger fs-4">Tu carrito está vacío.</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Ilustración de carrito vacío"
              className="empty-cart-img"
            />
            <Link
              to="/gallery"
              className="btn btn-dark btn-lg mt-3 explore-btn"
              aria-label="Ir a la galería de productos"
            >
              Ir a la Galería y seguir comprando
            </Link>
          </div>
        ) : (
          <>
            <div className="list-group" role="list">
              {cart.map((item) => (
                <div
                  key={item.id}
                  role="listitem"
                  className="list-group-item"
                  aria-label={`Producto ${item.title} en el carrito`}
                >
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center w-100 gap-3">
                    <div className="d-flex align-items-start">
                      <img
                        src={item.image}
                        alt={`Imagen de ${item.title}`}
                        className="me-3"
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          flexShrink: 0
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

                    <div className="d-flex flex-wrap gap-2 align-items-center justify-content-start justify-content-md-end">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                        aria-label={`Disminuir cantidad de ${item.title}`}
                      >
                        -
                      </button>
                      <span
                        aria-live="polite"
                        aria-atomic="true"
                        className="px-2"
                      >
                        {item.quantity}
                      </span>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          const product = getProductById(item.id);
                          if (product && item.quantity < product.stock) {
                            updateQuantity(item.id, 1);
                          } else {
                            toast.warn('Stock máximo alcanzado');
                          }
                        }}
                        aria-label={`Aumentar cantidad de ${item.title}`}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Eliminar ${item.title} del carrito`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-4 gap-3">
              <h2>
                Total:{' '}
                <span className="text-success" aria-label={`Total: ${calculateTotal().toFixed(2)} dólares`}>
                  ${calculateTotal().toFixed(2)}
                </span>
              </h2>
              <div className="d-flex gap-3">
                <button
                  className="btn btn-outline-danger"
                  onClick={clearCart}
                  aria-label="Vaciar carrito"
                >
                  Vaciar Carrito
                </button>
                <button
                  className="btn btn-success"
                  onClick={finishPurchase}
                  aria-label="Finalizar compra"
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Cart;








































