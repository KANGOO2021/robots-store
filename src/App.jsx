import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';          
import Admin from './pages/Admin';          
import PrivateRoute from './auth/PrivateRoute';  

// Función para calcular el total del carrito
const calculateTotal = (cart) => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

// Componente principal de la aplicación
function App() {
  // Estado para productos cargados
  const [products, setProducts] = useState([]);

  // Estado para carrito, con persistencia en localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Estado para controlar autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Carga los productos desde JSON local al montar el componente
  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, []);

  // Guarda el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Agrega un producto al carrito (si no está ya)
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      toast.info(`Este producto ya está en el carrito.`);
    } else {
      if (typeof product.price !== 'number' || isNaN(product.price)) {
        toast.error("Este producto no tiene un precio válido.");
        return;
      }
      const newCart = [
        ...cart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
      setCart(newCart);
      toast.success(`${product.title} agregado al carrito.`);
    }
  };

  // Cambia la cantidad de un producto en el carrito
  const updateQuantity = (id, delta) => {
    const newCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(newCart);
  };

  // Elimina un producto del carrito
  const removeFromCart = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) toast.warn(`${item.title} eliminado del carrito.`);
    setCart(cart.filter((item) => item.id !== id));
  };

  // Vacía el carrito completo
  const clearCart = () => {
    setCart([]);
    toast.info("El carrito fue vaciado.");
  };

  // Finaliza la compra (vacía carrito y notifica)
  const finishPurchase = () => {
    setCart([]);
    toast.success("¡Compra finalizada con éxito!");
  };

  // Recibe el resultado del login desde el componente Login
  const handleLogin = (loggedIn) => {
    setIsAuthenticated(loggedIn);
  };

  return (
    <Router>
      <Header cartItemCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/gallery"
          element={<Gallery products={products} addToCart={addToCart} cart={cart} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              finishPurchase={finishPurchase}
              calculateTotal={() => calculateTotal(cart)}
            />
          }
        />
        <Route
          path="/products/:id"
          element={<ProductDetail products={products} addToCart={addToCart} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute isAuth={isAuthenticated}>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar />
    </Router>
  );
}

export default App;











