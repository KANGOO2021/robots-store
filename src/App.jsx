import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Páginas principales
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminProducts from './pages/AdminProducts';
import CheckoutForm from './components/CheckoutForm'; 

// Layout
import Header from './components/Header';
import Footer from './components/Footer';

// Proveedores de contexto para estado global
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

// Rutas privadas y para admins
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onSearch={handleSearch} />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery searchTerm={searchTerm} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Ruta protegida para carrito */}
          <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          } />

          {/* ✅ Ruta protegida para el checkout con nombre corregido */}
          <Route path="/checkout" element={
            <PrivateRoute>
              <CheckoutForm />
            </PrivateRoute>
          } />

          {/* Ruta protegida solo para admins */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          } />
        </Routes>
      </main>

      <Footer />
      <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;














