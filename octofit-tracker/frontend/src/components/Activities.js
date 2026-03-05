import React, { useEffect, useState } from 'react';

function getApiUrl() {
  const codespace = window.REACT_APP_CODESPACE_NAME || '';
  const protocol = codespace ? 'https' : 'http';
  const host = codespace ? `${codespace}-8000.app.github.dev` : 'localhost:8000';
  return `${protocol}://${host}/api/activities/`;
}

function Activities() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching Activities from:', url);
    fetch(url)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Activities data:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);
  return (
    <div className="card mb-4">
      <div className="card-header bg-info text-white">
        <h2 className="card-title">Activities</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.user}</td>
                <td>{item.type}</td>
                <td>{item.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Activities;
