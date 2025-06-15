import React from "react";
import { useNavigate } from "react-router-dom";

const zones = ["Zone 1", "Zone 2", "Zone 3", "Zone 4"];

export default function ZonePage() {
  const navigate = useNavigate();

  const handleClick = (zone) => {
    // Extract zone number, e.g. "Zone 1" => "1"
    const zoneId = zone.split(" ")[1];
    navigate(`/zone/${zoneId}`);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <header
        style={{
          backgroundColor: "purple",
          padding: "30px",
          textAlign: "center",
          marginBottom: "40px",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ color: "pink", margin: 0, fontSize: "3rem" }}>
          Quantum University
        </h1>
        <p style={{ color: "white", fontSize: "1.5rem", marginTop: "8px" }}>
          Zones
        </p>
      </header>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {zones.map((zone) => (
          <div
            key={zone}
            onClick={() => handleClick(zone)}
            style={{
              cursor: "pointer",
              backgroundColor: "#eee",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              width: "150px",
              height: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
              userSelect: "none",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d1c4e9")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#eee")}
          >
            {zone}
          </div>
        ))}
      </div>
    </div>
  );
}
