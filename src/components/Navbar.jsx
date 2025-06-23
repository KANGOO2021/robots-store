import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { useState } from 'react';
import SearchBar from './SearchBar';

function NavBar({ onSearch }) {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    toast.info('Sesión cerrada');
    navigate('/');
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onSearch && onSearch(value);
  };

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color =
      '#' +
      ((hash >> 24) & 0xff).toString(16).padStart(2, '0') +
      ((hash >> 16) & 0xff).toString(16).padStart(2, '0') +
      ((hash >> 8) & 0xff).toString(16).padStart(2, '0');
    return color.length === 7 ? color : '#007bff';
  };

  const renderUserBadge = () => {
    if (!user) return null;

    if (user.role === 'admin') {
      return <span className="badge bg-danger ms-2">Admin</span>;
    } else {
      const initial =
        user.name?.charAt(0).toUpperCase() ||
        user.email?.charAt(0).toUpperCase() ||
        '?';
      const bgColor = stringToColor(user.name || user.email || 'user');

      return (
        <div
          className="ms-2 d-flex justify-content-center align-items-center text-white fw-bold"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: bgColor,
            fontSize: '0.9rem',
          }}
          title={user.name || user.email}
          aria-label={`Usuario: ${user.name || user.email}`}
          role="img"
        >
          {initial}
        </div>
      );
    }
  };

  const cartItemCount = cart.length;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          aria-current={location.pathname === '/' ? 'page' : undefined}
        >
          Robots Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                aria-current={location.pathname === '/' ? 'page' : undefined}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/gallery"
                aria-current={location.pathname === '/gallery' ? 'page' : undefined}
              >
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                aria-current={location.pathname === '/contact' ? 'page' : undefined}
              >
                Contacto
              </Link>
            </li>
            {user?.role === 'admin' && (
              <li className="nav-item">
                <Link
                  className="nav-link text-danger fw-bold"
                  to="/admin"
                  aria-current={location.pathname === '/admin' ? 'page' : undefined}
                >
                  ⚙ Panel
                </Link>
              </li>
            )}
          </ul>

          {location.pathname === '/gallery' && (
            <div className="me-3">
              <SearchBar searchTerm={searchTerm} onSearch={handleSearchChange} />
            </div>
          )}

          <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
            {user && (
              <li
                className="nav-item me-2 position-relative"
                style={{ minWidth: '40px' }}
              >
                <Link
                  className="nav-link position-relative"
                  to="/cart"
                  style={{ fontSize: '1.4rem' }}
                  title="Carrito"
                  aria-label={`Carrito con ${cartItemCount} items`}
                >
                  🛒
                  {cartItemCount > 0 && (
                    <span
                      className="position-absolute badge rounded-pill bg-success"
                      style={{
                        top: '2px',
                        right: '2px',
                        transform: 'none',
                        fontSize: '0.75rem',
                        lineHeight: '1',
                        padding: '0.25em 0.4em',
                      }}
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </li>
            )}

            {!user && location.pathname !== '/login' && location.pathname !== '/register' && (
              <li className="nav-item" title="Iniciar sesión">
                <Link
                  className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
                  to="/login"
                  aria-label="Iniciar sesión rápidamente"
                  style={{ padding: '0.25rem 0.75rem' }}
                >
                  <BiLogIn size={20} aria-hidden="true" />
                </Link>
              </li>
            )}

            {user && (
              <>
                <li className="nav-item" title="Cerrar sesión">
                  <button
                    className="btn btn-outline-light btn-sm ms-2 d-flex align-items-center gap-1"
                    onClick={handleLogout}
                    aria-label="Cerrar sesión"
                    type="button"
                    style={{ padding: '0.25rem 0.75rem' }}
                  >
                    <BiLogOut size={20} aria-hidden="true" />
                  </button>
                </li>
                <li className="nav-item">{renderUserBadge()}</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
















