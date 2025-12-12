import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (q.trim()) {
      onSearch(q);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      marginBottom: '30px', 
      width: '100%' 
    }}>
      <div style={{ 
        display: 'flex', 
        maxWidth: '400px', 
        width: '100%' 
      }}>
        <input
          type="text"
          style={{
            flex: 1,
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '4px 0 0 4px',
            fontSize: '16px',
            outline: 'none' // This removes the blue border on focus
          }}
          placeholder="Enter city name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = '#28a745'; // Green border on focus
            e.target.style.boxShadow = '0 0 0 2px rgba(40, 167, 69, 0.25)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#ddd'; // Reset border color
            e.target.style.boxShadow = 'none';
          }}
        />
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer',
            fontSize: '16px',
            outline: 'none' // Remove blue border from button too
          }}
          type="submit"
          onFocus={(e) => {
            e.target.style.boxShadow = '0 0 0 2px rgba(40, 167, 69, 0.5)';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = 'none';
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
}