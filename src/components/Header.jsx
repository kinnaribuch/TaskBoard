import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1>TaskBoard</h1>
      <nav>
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/signup" className="mr-4">Sign Up</Link>
        <Link to="/" className="mr-4">Home</Link>
      </nav>
    </header>
  );
};

export default Header;
