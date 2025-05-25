import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import robotLogo from "/robostore-favicon.png"; 

/**
 * Barra de navegación principal del sitio.
 * Muestra enlaces a las diferentes páginas, el ícono del carrito con cantidad de ítems
 * y opciones de acceso según si el usuario está autenticado.
 *
 * Props:
 * - cartItemCount: número total de productos en el carrito
 * - isAuthenticated: booleano que indica si el usuario ha iniciado sesión
 */
const Navbar = ({ cartItemCount, isAuthenticated }) => {
  // Retorna clases CSS según si el enlace está activo o no
  const getActiveClass = ({ isActive }) =>
    isActive ? "nav-link active text-info" : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <img
        className="me-3"
        src={robotLogo}
        alt="Robot Logo"
        width="32"
        height="32"
      />
      <NavLink className="navbar-brand" to="/">
        Robots Store
      </NavLink>

      {/* Botón hamburguesa para vista móvil */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Enlaces del menú de navegación */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className={getActiveClass} to="/">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={getActiveClass} to="/gallery">
              Galería
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={getActiveClass} to="/contact">
              Contacto
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={getActiveClass} to="/cart">
              <FaShoppingCart />{" "}
              {/* Muestra el número de ítems en el carrito si hay al menos uno */}
              {cartItemCount > 0 && (
                <span className="badge bg-success">{cartItemCount}</span>
              )}
            </NavLink>
          </li>
          <li className="nav-item">
            {/* Si está autenticado, muestra "Admin"; si no, muestra "Login" */}
            {isAuthenticated ? (
              <NavLink className={getActiveClass} to="/admin">
                Admin
              </NavLink>
            ) : (
              <NavLink className={getActiveClass} to="/login">
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;






