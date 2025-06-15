import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ZoneDetailPage() {
  const { id } = useParams(); // zone id from URL
  const navigate = useNavigate();

  // Sample vehicle data (you can replace with fetch to backend later)
  const [vehicles, setVehicles] = useState([
    {
      name: "Tractor A",
      uniqueId: "TR-001",
      longitude: 77.5946,
      latitude: 12.9716,
    },
    {
      name: "Harvester B",
      uniqueId: "HV-007",
      longitude: 77.5950,
      latitude: 12.9720,
    },
    {
      name: "Sprayer C",
      uniqueId: "SP-009",
      longitude: 77.5965,
      latitude: 12.9733,
    },
  ]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <button
        onClick={() => navigate("/zone")}
        style={{ marginBottom: "20px", cursor: "pointer" }}
      >
        ← Back to Zones
      </button>

      <h2>Vehicles in Zone {id}</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#eee" }}>
            <th style={thStyle}>Vehicle Name</th>
            <th style={thStyle}>Unique ID</th>
            <th style={thStyle}>Longitude</th>
            <th style={thStyle}>Latitude</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={tdStyle}>{v.name}</td>
              <td style={tdStyle}>{v.uniqueId}</td>
              <td style={tdStyle}>{v.longitude}</td>
              <td style={tdStyle}>{v.latitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "2px solid #aaa",
};

const tdStyle = {
  padding: "12px",
};
