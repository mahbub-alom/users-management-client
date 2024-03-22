import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUsers = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        form.reset();
        const newUser = [...users, data];
        setUsers(newUser);
      });
  };

  return (
    <>
      <h1>Vite + React</h1>
      <form onSubmit={handleAddUsers}>
        <input type="text" name="name" placeholder="name" />
        <br />
        <input type="email" name="email" id="" placeholder="email" />
        <br />
        <input type="submit" value="Add Users" />
      </form>

      <h1>Users: {users.length}</h1>
      {users.map((user) => (
        <p key={user.id}>
          {user.id}: {user.name}: {user.email}
        </p>
      ))}
    </>
  );
}

export default App;
