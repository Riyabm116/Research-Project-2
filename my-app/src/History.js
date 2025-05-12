import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientHistory() {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [patientData, setPatientData] = useState(null);

  const handleLogout = () => {
    navigate("/login"); 
  };


  const handleSearch = async () => {
    if (!patientName.trim()) {
      alert("Please enter a patient name.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3002/get-patient-by-name?name=${patientName}`);
      const data = await response.json();
      console.log("Response from API:", data);

      if (response.ok) {
        setPatientData(data);
      } else {
        alert("Patient not found");
        setPatientData(null);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("Failed to fetch patient data");
    }
  };

  
  return (
    <div className="history-container">
      <h2>Patient History</h2>
      <div className="top-nav" >
        <input
          type="text"
          placeholder="Search"
          className="search-box"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          
        />
        <button className="search-btn" onClick={handleSearch} >
          🔍
        </button>
       <button className="nav-btn" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {patientData ? (
        <table >
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(patientData).map((key) => (
              <tr key={key}>
                <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                <td>
                  {typeof patientData[key] === "object" && patientData[key] !== null
                    ? JSON.stringify(patientData[key])
                    : patientData[key]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Please search for a patient to display details.</p>
      )}
    </div>
  );
}

export default PatientHistory;