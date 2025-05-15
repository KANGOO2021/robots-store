import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = ({ cartItemCount }) => {
  const getActiveClass = ({ isActive }) =>
    isActive ? "nav-link active text-info" : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand" to="/">Robots Store</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className={getActiveClass} to="/">Inicio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={getActiveClass} to="/gallery">Galería</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={getActiveClass} to="/contact">Contacto</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={getActiveClass} to="/cart">
              <FaShoppingCart />{" "}
              {cartItemCount > 0 && <span className="badge bg-success">{cartItemCount}</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;



