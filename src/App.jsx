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
  // Estado local para el término de búsqueda usado en Gallery
  const [searchTerm, setSearchTerm] = useState('');

  // Función para actualizar término de búsqueda desde Header
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header con barra de búsqueda */}
      <Header onSearch={handleSearch} />

      {/* Contenido principal con rutas */}
      <main className="flex-grow-1">
        <Routes>
          {/* Ruta pública principal */}
          <Route path="/" element={<Home />} />

          {/* Ruta pública de catálogo, con búsqueda */}
          <Route path="/gallery" element={<Gallery searchTerm={searchTerm} />} />

          {/* Ruta pública de contacto */}
          <Route path="/contact" element={<Contact />} />

          {/* Ruta protegida para carrito, solo usuarios logueados */}
          <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          } />

          {/* Ruta pública para detalle de producto dinámico */}
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Ruta pública para login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta pública para registro */}
          <Route path="/register" element={<Register />} />

          {/* Ruta protegida para administración, solo admins */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          } />
        </Routes>
      </main>

      {/* Footer fijo */}
      <Footer />

      {/* Contenedor para notificaciones toast */}
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar
      />
    </div>
  );
}

// Componente principal que envuelve toda la app en proveedores y router
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












