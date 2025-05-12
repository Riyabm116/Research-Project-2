import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom"; 

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [patientData, setPatientData] = useState(null);

  const timeLabels = ["1min", "2min", "3min", "4min", "5min"];

  const [oxygenData, setOxygenData] = useState({
    labels: timeLabels,
    datasets: [{ label: "Oxygen Saturation", data: [90, 92, 91, 89, 95], borderColor: "blue", borderWidth: 2, fill: false }],
  });
  const [bloodPressureData, setBloodPressureData] = useState({
    labels: timeLabels,
    datasets: [{ label: "Blood Pressure (mmHg)", data: [120, 130, 125, 118, 122], backgroundColor: "gray" }],
  });
  const [heartRateData, setHeartRateData] = useState({
    labels: timeLabels,
    datasets: [{ label: "Heart Rate (BPM)", data: [75, 78, 80, 74, 76], borderColor: "purple", borderWidth: 2, fill: false }],
  });

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3002/get-patient-by-name?name=${patientName}`);
      const data = await response.json();

      console.log("Response from API :", data);

      if (response.ok) {
        setPatientData(data); 
        console.log("Patient Data : ", patientData);
      } else {
        alert("Patient not found");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("Failed to fetch patient data");
    }
  };

  useEffect(() => {
    if (patientData) {
      setOxygenData({
        labels: timeLabels,
        datasets: [{
          label: "Oxygen Saturation",
          data: patientData?.vitals?.oxygenSaturation || [],
          borderColor: "blue",
          borderWidth: 2,
          fill: false
        }],
      });
      setBloodPressureData({
        labels: timeLabels,
        datasets: [{
          label: "Blood Pressure (mmHg)",
          data: patientData?.vitals?.bloodPressure || [],
          backgroundColor: "gray"
        }],
      });
      setHeartRateData({
        labels: timeLabels,
        datasets: [{
          label: "Heart Rate (BPM)",
          data: patientData?.vitals?.heartRate || [],
          borderColor: "purple",
          borderWidth: 2,
          fill: false
        }],
      });
      console.log("Within Use effect patientData: ", patientData);
      }
  }, [patientData]); 

  const goToHistory = () => {
    navigate("/history");
  };


  return (
    <div className="dashboard-container">
      <div className="top-nav">
         <input type="text" placeholder="Search" className="search-box" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
        <button className="search-btn" onClick={handleSearch}>🔍</button>
        <button className="nav-btn" onClick={goToHistory}>
          History
        </button>
        <button className="logout-btn">Logout</button>

      </div>

      {patientData ? (
        <div className="graphs-container">
          <div className="graph-box">
            <h3>Oxygen Saturation</h3>
            <Line
              data={oxygenData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    min: 80,
                    max: 100,
                    title: {
                      display: true,
                      text: "Oxygen Saturation (%)"
                    }
                  }
                }
              }}
            />
          </div>
          <div className="graph-box">
            <h3>Blood Pressure</h3>
            <Bar
              data={bloodPressureData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    min: 80,
                    max: 180,
                    title: {
                      display: true,
                      text: "Blood Pressure (mmHg)"
                    }
                  }
                }
              }}
            />
          </div>
          <div className="graph-box">
            <h3>Heart Rate</h3>
            <Line
              data={heartRateData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    min: 50,
                    max: 150,
                    title: {
                      display: true,
                      text: "Heart Rate (BPM)"
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      ) : (
        <p className="no-data-message">Search for a patient to display vitals.</p>
      )}
    </div>
  );
}



export default Dashboard;