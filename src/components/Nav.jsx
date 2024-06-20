import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTopics } from "../api";

export const Nav = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllTopics()
      .then((result) => {
        setTopics(result.data.topics);
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
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {topics.map((topic) => {
          const capitalisedTopic =
            topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1);
          return (
            <li key={topic.slug}>
              <Link to={`/topics/${topic.slug}`}>{capitalisedTopic}</Link>
            </li>
          );
        })}
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
};
