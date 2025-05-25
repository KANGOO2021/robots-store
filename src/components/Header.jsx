import Navbar from './Navbar';

/**
 * Componente de encabezado que incluye la barra de navegación principal.
 * Recibe:
 * - cartItemCount: cantidad de productos en el carrito
 * - isAuthenticated: estado de autenticación del usuario
 */
function Header({ cartItemCount, isAuthenticated }) {
  return (
    <header>
      <Navbar cartItemCount={cartItemCount} isAuthenticated={isAuthenticated} />
    </header>
  );
}

export default Header;




