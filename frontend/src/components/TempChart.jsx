import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function TempChart({ forecast }) {
  const chartRef = useRef();

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    const labels = forecast.slice(0, 10).map(f => f.dt_txt);
    const temps = forecast.slice(0, 10).map(f => f.main.temp);

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: temps,
          borderColor: '#198754',
          backgroundColor: 'rgba(25,135,84,0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { 
          legend: { 
            display: true, 
            position: 'top',
            labels: {
              boxWidth: 20,
              padding: 15
            }
          } 
        },
        scales: { 
          y: { 
            beginAtZero: true,
            grid: {
              display: true,
              color: 'rgba(0,0,0,0.1)'
            }
          },
          x: {
            grid: {
              display: true,
              color: 'rgba(0,0,0,0.1)'
            }
          }
        }
      }
    });

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [forecast]);

  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: '100%', height: '300px' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}