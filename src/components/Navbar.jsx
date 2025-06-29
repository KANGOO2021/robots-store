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
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    toast.info('Sesión cerrada');
    navigate('/');
    setExpanded(false);
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

  const handleLinkClick = () => {
    setExpanded(false);
  };

  return (
    <>
      <style>
        {`
          /* Quitar borde/outline verde del toggler */
          .navbar-toggler {
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
          }

          /* Mostrar toggler sólo en móvil (<768px) */
          @media (min-width: 768px) {
            .navbar-toggler {
              display: none !important;
            }
          }

          /* Forzar navbar-expand en tablet (768px a 991px) */
          @media (min-width: 768px) and (max-width: 991px) {
            #navMenu {
              display: flex !important;
              flex-basis: auto !important;
              visibility: visible !important;
              height: auto !important;
              flex-direction: row !important; /* menú en fila */
              align-items: center !important;
            }

            .container-fluid {
              display: flex !important;
              flex-wrap: nowrap;
              align-items: center;
              justify-content: space-between;
            }

            .navbar-nav {
              flex-direction: row !important;
              margin-bottom: 0 !important;
            }

            .navbar-nav .nav-item {
              margin-left: 1rem;
              margin-right: 1rem;
            }

            .d-lg-none {
              display: none !important;
            }
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            aria-current={location.pathname === '/' ? 'page' : undefined}
            onClick={handleLinkClick}
          >
            Robots Store
          </Link>

          {/* Íconos carrito, logout y login en mobile */}
          <div className="d-lg-none d-flex align-items-center gap-2 ms-auto">
            {user && (
              <>
                <Link
                  className="text-white fs-5 position-relative"
                  to="/cart"
                  onClick={handleLinkClick}
                  style={{ textDecoration: 'none' }}
                >
                  🛒
                  {cartItemCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={handleLogout}
                  aria-label="Cerrar sesión"
                  className="btn btn-link text-white p-0 fs-5"
                  style={{ cursor: 'pointer' }}
                  type="button"
                >
                  <BiLogOut size={24} />
                </button>
              </>
            )}

            {!user &&
              location.pathname !== '/login' &&
              location.pathname !== '/register' && (
                <Link
                  className="text-white fs-5"
                  to="/login"
                  title="Iniciar sesión"
                  onClick={handleLinkClick}
                  style={{ textDecoration: 'none' }}
                >
                  <BiLogIn size={24} />
                </Link>
              )}
          </div>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navMenu"
            aria-expanded={expanded}
            aria-label="Toggle navigation"
            onClick={() => setExpanded(!expanded)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}
            id="navMenu"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  aria-current={location.pathname === '/' ? 'page' : undefined}
                  onClick={handleLinkClick}
                >
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/gallery"
                  aria-current={location.pathname === '/gallery' ? 'page' : undefined}
                  onClick={handleLinkClick}
                >
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/contact"
                  aria-current={location.pathname === '/contact' ? 'page' : undefined}
                  onClick={handleLinkClick}
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
                    onClick={handleLinkClick}
                  >
                    ⚙ Panel
                  </Link>
                </li>
              )}
            </ul>

            {/* Buscador */}
            {location.pathname === '/gallery' && (
              <>
                {/* Buscador en menú hamburguesa para móvil (<768px) */}
                <div className="w-100 d-lg-none mb-3">
                  <SearchBar searchTerm={searchTerm} onSearch={handleSearchChange} />
                </div>

                {/* Buscador visible en tablet y desktop (≥768px) fuera del menú hamburguesa */}
                <div className="d-none d-md-flex ms-auto" style={{ maxWidth: '300px' }}>
                  <SearchBar searchTerm={searchTerm} onSearch={handleSearchChange} />
                </div>
              </>
            )}

            {/* Área de usuario visible en tablet (md) y desktop (lg en adelante) */}
            <ul className="navbar-nav mb-2 mb-lg-0 d-none d-md-flex align-items-center">
              {user && (
                <li
                  className="nav-item me-2 position-relative"
                  style={{ minWidth: '40px' }}
                >
                  <Link
                    className="nav-link position-relative"
                    to="/cart"
                    style={{ fontSize: '1.4rem', textDecoration: 'none' }}
                    title="Carrito"
                    aria-label={`Carrito con ${cartItemCount} items`}
                    onClick={handleLinkClick}
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

              {!user &&
                location.pathname !== '/login' &&
                location.pathname !== '/register' && (
                  <li className="nav-item" title="Iniciar sesión">
                    <Link
                      className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
                      to="/login"
                      aria-label="Iniciar sesión rápidamente"
                      style={{ padding: '0.25rem 0.75rem', textDecoration: 'none' }}
                      onClick={handleLinkClick}
                    >
                      <BiLogIn size={20} aria-hidden="true" />
                    </Link>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

























