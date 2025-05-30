import React, { useState } from 'react';

const UrlStats = () => {
  const [formData, setFormData] = useState({ short_code: '' });
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchStats = async () => {
    setError('');
    setStats(null);

    const code = formData.short_code.trim();

    if (!code) {
      setError('Please enter a short code.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/stats/${code}`);

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to fetch statistics.');
        return;
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError('Error connecting to the server.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Short URL Statistics</h2>

      <input
        type="text"
        name="short_code"
        placeholder="Enter short code"
        value={formData.short_code}
        onChange={handleChange}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <button onClick={fetchStats} style={{ padding: '8px 16px' }}>
        Get Statistics
      </button>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}

      {stats && (
        <div style={{ marginTop: 20, background: '#f0f0f0', padding: 10, borderRadius: 5 }}>
          <p><strong>Original URL:</strong> {stats.original_url}</p>
          <p><strong>Short Code:</strong> {stats.short_code}</p>
          <p><strong>Click Count:</strong> {stats.click_count}</p>
          <p><strong>Created At:</strong> {new Date(stats.created_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default UrlStats;
