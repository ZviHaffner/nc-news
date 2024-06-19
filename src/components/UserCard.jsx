import { useContext } from "react";
import { UserContext } from "../contexts/User";

export const UserCard = ({ user }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const loginUser = () => {
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <section className="user-card" onClick={loginUser}>
      <h3>{user.username}</h3>
      <img src={user.avatar_url} id="user-img" />
      <p>{user.name}</p>
    </section>
  );
};