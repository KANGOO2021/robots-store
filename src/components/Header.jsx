import Navbar from './Navbar';

function Header({ cartItemCount }) {
  return (
    <header>
      <Navbar cartItemCount={cartItemCount} />
    </header>
  );
}

export default Header;


