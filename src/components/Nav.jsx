import { Link } from 'react-router-dom';

export const Nav = () => (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/users">Users</Link></li>
      </ul>
    </nav>
);
