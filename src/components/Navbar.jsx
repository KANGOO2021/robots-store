import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
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
      return (
        <>
          <span className="badge bg-danger ms-2 d-none d-sm-inline-block" aria-label="Administrador" style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
            Admin
          </span>
          <Link to="/admin" className="d-inline-block d-sm-none ms-2" title="Panel de administrador">
            <FiSettings
              size={22}
              color="#dc3545"
              style={{ cursor: 'pointer', filter: 'drop-shadow(0 0 2px #dc3545)' }}
              aria-label="Panel de administrador"
              role="img"
              tabIndex={0}
            />
          </Link>
        </>
      );
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
      <style>{`
        .navbar-toggler {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }

        @media (min-width: 768px) {
          .navbar-toggler {
            display: none !important;
          }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          #navMenu {
            display: flex !important;
            flex-basis: auto !important;
            visibility: visible !important;
            height: auto !important;
            flex-direction: row !important;
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
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={handleLinkClick}>Robots Store</Link>

          <div className="d-lg-none d-flex align-items-center gap-2 ms-auto">
            {user && (
              <>
                <Link
                  className="text-white fs-5 position-relative"
                  to="/cart"
                  onClick={handleLinkClick}
                  style={{ textDecoration: 'none', fontSize: '1.5rem', lineHeight: '1' }}
                >
                  🛒
                  {cartItemCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                      style={{ fontSize: '0.7rem', padding: '0.3em 0.5em' }}
                    >
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <button onClick={handleLogout} className="btn btn-link text-white p-0 fs-5" type="button">
                  <BiLogOut size={24} />
                </button>

                {renderUserBadge()}
              </>
            )}

            {!user && location.pathname !== '/login' && location.pathname !== '/register' && (
              <Link className="text-white fs-5" to="/login" onClick={handleLinkClick}>
                <BiLogIn size={24} />
              </Link>
            )}
          </div>

          <button className="navbar-toggler" type="button" onClick={() => setExpanded(!expanded)}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="navMenu">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleLinkClick}>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gallery" onClick={handleLinkClick}>Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact" onClick={handleLinkClick}>Contacto</Link>
              </li>
              {user?.role === 'admin' && (
                <li className="nav-item d-block d-sm-none">
                  <Link className="nav-link text-danger fw-bold" to="/admin" onClick={handleLinkClick}>
                    ⚙ Panel
                  </Link>
                </li>
              )}
            </ul>

            {location.pathname === '/gallery' && (
              <>
                <div className="w-100 d-lg-none mb-3">
                  <SearchBar searchTerm={searchTerm} onSearch={handleSearchChange} />
                </div>
                <div className="d-none d-md-flex ms-auto" style={{ maxWidth: '300px' }}>
                  <SearchBar searchTerm={searchTerm} onSearch={handleSearchChange} />
                </div>
              </>
            )}

            <ul className="navbar-nav mb-2 mb-lg-0 d-none d-md-flex align-items-center">
              {user && (
                <>
                  <li className="nav-item me-2 position-relative" style={{ minWidth: '40px' }}>
                    <Link
                      className="nav-link position-relative"
                      to="/cart"
                      onClick={handleLinkClick}
                      style={{ fontSize: '1.8rem', textDecoration: 'none', lineHeight: '1' }}
                    >
                      🛒
                      {cartItemCount > 0 && (
                        <span
                          className="position-absolute badge rounded-pill bg-success"
                          style={{
                            top: '0px',
                            right: '-5px',
                            fontSize: '0.7rem',
                            padding: '0.3em 0.5em',
                            transform: 'none',
                          }}
                        >
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout} type="button">
                      <BiLogOut size={20} />
                    </button>
                  </li>

                  <li className="nav-item">{renderUserBadge()}</li>
                </>
              )}
              {!user && location.pathname !== '/login' && location.pathname !== '/register' && (
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm" to="/login" onClick={handleLinkClick}>
                    <BiLogIn size={20} />
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






























