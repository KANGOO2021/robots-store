import Navbar from './Navbar';

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



