import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:8000/requests');
        setRequests(response.data.requests);
        console.log(response);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
        alert('Error fetching data: ' + err.message);
      }
    };

    fetchRequests();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Requests</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Status</th>
            <th>Raised On</th>
            <th>Issue Description</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.type}</td>
              <td>{request.status}</td>
              <td>{new Date(request.raised_on).toLocaleDateString()}</td>
              <td>{request.issue_description}</td>
              <td>{request.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
