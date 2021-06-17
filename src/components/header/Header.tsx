import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">home</Link>
      <Link to="/seller">seller</Link>
      <Link to="/user">user</Link>
    </header>
  );
};

export default Header;
