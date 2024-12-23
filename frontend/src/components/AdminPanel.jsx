import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/messages')
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="admin-panel">
      <h2>Admin Panel - Messages</h2>
      {messages.map((msg) => (
        <div key={msg._id} className="message-item">
          <h4>Name : {msg.name}</h4>
          <p> Mobile Number : {msg.email}</p>
          <p>Message : {msg.message}</p>
          <small>{new Date(msg.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
