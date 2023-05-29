import { Link } from "react-router-dom";
import "../assets/tabsnav.css";

const TabsNav = () => {
  return (
    <nav className="nav nav-pills nav-fill">
      <Link to="/" className="nav-link" aria-current="page">
        Dashboard
      </Link>
      <Link to="/vendor" className="nav-link" aria-current="page">
        Analyst Dashboard
      </Link>
      <Link to="/products" className="nav-link" aria-current="page">
        Products
      </Link>
      <Link to="/orders" className="nav-link">
        Orders
      </Link>
    </nav>
  );
};

export default TabsNav;
