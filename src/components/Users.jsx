import { useEffect, useState, useContext } from "react";
import { getAllUsers } from "../api";
import { UserCard } from "./UserCard";
import { UserContext } from "../contexts/User";

export const Users = () => {
  const { currentUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllUsers()
      .then((result) => {
        setUsers(result.data.users);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) {
    return (
      <>
        <h1>{error.response.status}</h1>
        <p>{error.response.data.msg}</p>
      </>
    );
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {Object.keys(currentUser).length === 0 ? <p>Select User to Log In</p> : null}
      <section className="users">
        {users.map((user) => {
          return <UserCard key={user.username} user={user}></UserCard>;
        })}
      </section>
    </>
  );
};
