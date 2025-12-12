import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import API from './services/api';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (q) => {
    setLoading(true);
    try {
      const res = await API.get(`/weather`, { params: { q } });
      setData(res.data);
    } catch (e) {
      alert('Error fetching weather data');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <h1 className="text-success mb-4">Farmer Weather Advisory</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && (
        <div style={{
          margin: '30px 0',
          width: '60px',
          height: '60px',
          border: '6px solid rgba(40, 167, 69, 0.2)',
          borderTop: '6px solid #28a745',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      )}
      <style jsx="true">{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      {data && <WeatherCard data={data} />}
    </div>
  );
}