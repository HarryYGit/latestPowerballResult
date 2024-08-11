import React, { useState } from 'react';
import axios from 'axios';

const Powerball = () => {
  const [numbers, setNumbers] = useState([]);
  const [powerball, setPowerball] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPowerballNumbers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        'https://api.allorigins.win/get?url=' + 
        encodeURIComponent('https://api.ozlotteries.com/api/v2/draws/pricing/australia_nsw/past/powerball2018?limit=10&offset=0')
      );
      
      const data = JSON.parse(response.data.contents);
      const draw = data.result[0]; // Get the latest draw
      const mainNumbers = draw.number_sets[0].numbers.map(num => num.number);
      const powerballNumber = draw.number_sets[1].numbers[0].number;

      setNumbers(mainNumbers);
      setPowerball(powerballNumber);
    } catch (err) {
      setError('Failed to fetch Powerball numbers');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Powerball Results</h1>
      <button 
        onClick={fetchPowerballNumbers} 
        style={{ 
          padding: '12px 25px', 
          fontSize: '1em', 
          borderRadius: '8px', 
          backgroundColor: '#007bff', 
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          width: '80%',
          maxWidth: '300px',
          margin: 'auto',
          display: 'block'
        }}
      >
        Get Latest Powerball Numbers
      </button>
      {loading && <p style={{ fontSize: '1em', marginTop: '20px' }}>Loading...</p>}
      {error && <p style={{ color: 'red', fontSize: '1em', marginTop: '20px' }}>{error}</p>}
      {numbers.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ fontSize: '1.5em' }}>Winning Numbers:</h2>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '8px', 
            flexWrap: 'wrap',
            margin: '10px auto',
            maxWidth: '400px'
          }}>
            {numbers.map((number, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  padding: '15px',
                  borderRadius: '50%',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  fontSize: '1.5em',
                  width: '50px',
                  height: '50px',
                  textAlign: 'center',
                  lineHeight: '50px',
                }}
              >
                {number}
              </span>
            ))}
          </div>
          {powerball && (
            <div style={{ marginTop: '20px' }}>
              <h2 style={{ fontSize: '1.5em' }}>Powerball Number:</h2>
              <span
                style={{
                  display: 'inline-block',
                  padding: '15px',
                  borderRadius: '50%',
                  backgroundColor: '#ff5733',
                  color: '#fff',
                  fontSize: '1.5em',
                  width: '50px',
                  height: '50px',
                  textAlign: 'center',
                  lineHeight: '50px',
                }}
              >
                {powerball}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Powerball;
