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

// Función para calcular el total
const calculateTotal = (cart) => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Cargar productos desde archivo JSON
  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, []);

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito
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

  // Cambiar cantidad de un producto
  const updateQuantity = (id, delta) => {
    const newCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(newCart);
  };

  // Eliminar un producto del carrito
  const removeFromCart = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) toast.warn(`${item.title} eliminado del carrito.`);
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  // Vaciar todo el carrito
  const clearCart = () => {
    setCart([]);
    toast.info("El carrito fue vaciado.");
  };

  // Finalizar compra
  const finishPurchase = () => {
    setCart([]);
    toast.success("¡Compra finalizada con éxito!");
  };

  return (
    <Router>
      <Header cartItemCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery products={products} addToCart={addToCart} cart={cart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            finishPurchase={finishPurchase}
            calculateTotal={() => calculateTotal(cart)}
          />
        } />
        <Route path="/products/:id" element={
          <ProductDetail
            products={products}
            addToCart={addToCart}
          />
        } /> {/* ✅ Ruta dinámica agregada */}
      </Routes>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar />
    </Router>
  );
}

export default App;









