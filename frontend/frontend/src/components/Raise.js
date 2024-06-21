import React, { useState } from 'react';
import axios from 'axios';

function Raise() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  const handleRaiseRequest = async () => {
    try {
      const response = await axios.post('http://localhost:8000/requests', {
        name,
        email,
        type,
        issue_description: issueDescription,
      });

      alert(response.data.message);
      setName('');
      setEmail('');
      setType('');
      setIssueDescription('');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Raise a New Request</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRaiseRequest();
        }}
      >
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select type</option>
            <option value="call">Call</option>
            <option value="data">Data</option>
          </select>
        </label>
        <br />
        <label>
          Issue Description:
          <textarea value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Raise</button>
      </form>
    </div>
  );
}

export default Raise;
