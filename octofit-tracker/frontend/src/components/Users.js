import React, { useEffect, useState } from 'react';

function getApiUrl() {
  const codespace = window.REACT_APP_CODESPACE_NAME || '';
  const protocol = codespace ? 'https' : 'http';
  const host = codespace ? `${codespace}-8000.app.github.dev` : 'localhost:8000';
  return `${protocol}://${host}/api/users/`;
}

function Users() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching Users from:', url);
    fetch(url)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Users data:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);
  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h2 className="card-title">Users</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.team}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Users;
