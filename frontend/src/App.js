import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '' });

  // Fetch data from Java backend
  useEffect(() => {
    axios.get('http://localhost:9090/maven-archetype-webapp/hello')
      .then(res => setMessage(res.data))
      .catch(err => console.error(err));

    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = () => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  // Add new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return alert("Enter all fields");
    axios.post('http://localhost:5000/api/users', newUser)
      .then(() => {
        fetchUsers();
        setNewUser({ name: '', email: '' });
        alert("✅ User added successfully!");
      })
      .catch(err => console.error(err));
  };

  // Delete user
  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)

      .then(() => {
        fetchUsers();
        alert("🗑️ User deleted!");
      })
      .catch(err => console.error(err));
  };

  // Start editing user
  const handleEditUser = (user) => {
    setEditingUser(user.id);
    setEditData({ name: user.name, email: user.email });
  };

  // Save edited user
  const handleUpdateUser = () => {
    axios.put(`http://localhost:5000/api/users/${editingUser}`, editData)

      .then(() => {
        fetchUsers();
        setEditingUser(null);
        alert("✏️ User updated successfully!");
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial', margin: '20px' }}>
      <h1>🚀 React + Node + Java Integration</h1>

      <h3>✅ Data from Java Backend:</h3>
      <p>{message || 'Loading...'}</p>

      <h3>✅ Users from Node.js + MySQL:</h3>
      {users.map(user => (
        <div key={user.id} style={{ margin: '10px', borderBottom: '1px solid #ccc', padding: '5px' }}>
          {editingUser === user.id ? (
            <>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="Name"
              />
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                placeholder="Email"
              />
              <button onClick={handleUpdateUser}>💾 Save</button>
              <button onClick={() => setEditingUser(null)}>❌ Cancel</button>
            </>
          ) : (
            <>
              <span>{user.name} - {user.email}</span>
              <button onClick={() => handleEditUser(user)}>✏️ Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>🗑️ Delete</button>
            </>
          )}
        </div>
      ))}

      <h3>➕ Add New User</h3>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}
