import React from 'react';
import TempChart from './TempChart';
import { jsPDF } from 'jspdf';

export default function WeatherCard({ data }) {
  const { summary, advisories } = data;

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Weather Advisory — ${summary.location}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Temperature: ${summary.current.main.temp} °C`, 10, 20);
    doc.text(`Humidity: ${summary.current.main.humidity}%`, 10, 28);
    doc.text(`Wind Speed: ${(summary.current.wind.speed * 3.6).toFixed(1)} km/h`, 10, 36);
    doc.text("Advisories:", 10, 46);
    advisories.forEach((a, i) => doc.text(`${i + 1}. ${a}`, 12, 54 + i * 8));
    doc.save(`Weather_Advisory_${summary.location}.pdf`);
  };

  return (
    <div className="d-flex justify-content-center w-100">
      <div className="card shadow-lg border-0" style={{ maxWidth: '900px', width: '100%' }}>
        <div className="card-body p-4">
          {/* Location Title */}
          <h2 className="text-center text-success mb-4">{summary.location}</h2>
          
          {/* Horizontal Line */}
          <hr className="mx-auto mb-4" style={{ width: '80%', opacity: 0.2 }} />
          
          {/* Current Conditions */}
          <div className="mb-4">
            <h4 className="text-center text-success mb-3">Current Conditions</h4>
            <div className="row justify-content-center text-center">
              <div className="col-md-4 mb-3">
                <div className="p-3 border rounded">
                  <div className="fw-bold text-muted mb-1">Temperature</div>
                  <div className="h4 text-success">{summary.current.main.temp} °C</div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="p-3 border rounded">
                  <div className="fw-bold text-muted mb-1">Humidity</div>
                  <div className="h4 text-success">{summary.current.main.humidity}%</div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="p-3 border rounded">
                  <div className="fw-bold text-muted mb-1">Wind Speed</div>
                  <div className="h4 text-success">{(summary.current.wind.speed * 3.6).toFixed(1)} km/h</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Horizontal Line */}
          <hr className="mx-auto mb-4" style={{ width: '80%', opacity: 0.2 }} />
          
          {/* Advisories */}
          <div className="mb-4">
            <h4 className="text-center text-success mb-3">Advisories</h4>
            <div className="d-flex justify-content-center">
              <div className="p-3 border rounded bg-light" style={{ maxWidth: '700px', width: '100%' }}>
                {advisories.map((a, idx) => (
                  <div key={idx} className="mb-2">
                    • {a}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                className="btn btn-success btn-lg px-5"
                onClick={downloadPDF}
              >
                Download Advisory (PDF)
              </button>
            </div>
          </div>
          
          {/* Horizontal Line */}
          <hr className="mx-auto mb-4" style={{ width: '80%', opacity: 0.2 }} />
          
          {/* Temperature Forecast */}
          <div>
            <h4 className="text-center text-success mb-4">Temperature Forecast</h4>
            <div className="d-flex justify-content-center">
              <div style={{ maxWidth: '750px', width: '100%' }}>
                <TempChart forecast={summary.forecast} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}