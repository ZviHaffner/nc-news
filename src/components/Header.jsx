import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const hideOnPaths = ['/users'];

  const { currentUser } = useContext(UserContext);

  return (
    <section className="header">
      <h1>NC News</h1>
      <h2>Your Home for Truthy News</h2>
      {Object.keys(currentUser).length === 0? !hideOnPaths.includes(location.pathname) && (<Link to={'/users'}>Click Here to Log In</Link>) : <p>Logged In As: {currentUser.username}</p>}
    </section>
  );
};
