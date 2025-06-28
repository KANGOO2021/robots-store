import Navbar from './Navbar';

/**
 * Componente Header que envuelve y renderiza la barra de navegación (Navbar).
 * Recibe y pasa props para mostrar el total de ítems del carrito,
 * el término de búsqueda actual y la función de búsqueda.
 */
function Header({ cartItemCount, searchTerm, onSearch }) {
  return (
    <header>
      <Navbar 
        cartItemCount={cartItemCount} 
        searchTerm={searchTerm} 
        onSearch={onSearch} 
      />
    </header>
  );
}

export default Header;



