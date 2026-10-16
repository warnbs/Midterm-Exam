import { useState, useEffect } from "react";
import "../css/LiveSearchAndTimer.css";

const USERS = [
  { id: 1, name: "Ana Cruz", role: "Developer" },
  { id: 2, name: "Ben Lim", role: "Designer" },
  { id: 3, name: "Cara Yu", role: "Tester" },
  { id: 4, name: "Dan Go", role: "Developer" },
];

export default function LiveSearchAndTimer() {
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(USERS);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const results = USERS.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerQuery) ||
          user.role.toLowerCase().includes(lowerQuery)
      );
      setFilteredUsers(results);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  useEffect(() => {
    document.title = `Users (${filteredUsers.length})`;
  }, [filteredUsers]);

  return (
    <div className="timer-search-card">
      <h2 className="timer-search-title">Live Search and Session Timer</h2>

      <div className="timer-badge">
        Session Time: {seconds} second{seconds === 1 ? "" : "s"}
      </div>

      <div className="search-input-group">
        <label htmlFor="search-user-input">Search Users:</label>
        <input
          id="search-user-input"
          type="text"
          value={query}
          placeholder="Search by name or role..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <p className="result-count">Results found: {filteredUsers.length}</p>

      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user.id} className="user-item">
            <strong>{user.name}</strong>
            <span className="user-role-tag">{user.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}