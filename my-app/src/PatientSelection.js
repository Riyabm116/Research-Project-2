import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const PatientSelectionPage = () => {
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [checkupDate, setCheckupDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [savedDetails, setSavedDetails] = useState([]);

  const handleSave = () => {
    if (patientName && age && checkupDate) {
      const patientData = { patientName, age, checkupDate };
      setSavedDetails([...savedDetails, patientData]);
      setPatientName("");
      setAge("");
      setCheckupDate("");
      alert("✅ Patient details saved successfully!");
    } else {
      alert("⚠ Please fill in all the fields before saving.");
    }
  };

  const handleEdit = (index) => {
    const patient = savedDetails[index];
    setPatientName(patient.patientName);
    setAge(patient.age);
    setCheckupDate(patient.checkupDate);
    setSavedDetails(savedDetails.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setSavedDetails(savedDetails.filter((_, i) => i !== index));
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const filteredPatients = savedDetails.filter((patient) =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="top-nav">
        <input
          type="text"
          placeholder="Search by name"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn">
          <FaSearch />
        </button>
        <button className="nav-btn" onClick={goToDashboard}>Dashboard</button>
        <button className="nav-btn">History</button>
        <button className="logout-btn">Logout</button>
      </div>

     
      <div className="main-content">
        <h2 className="title">Patient Selection Page</h2>

        <div className="input-group">
          <label>Patient Name</label>
          <input
            type="text"
            className="input-field"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Age</label>
          <input
            type="number"
            className="input-field"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Last Check-up Date</label>
          <input
            type="date"
            className="input-field"
            value={checkupDate}
            onChange={(e) => setCheckupDate(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button className="save-btn" onClick={handleSave}>Save Details</button>
          <button className="dashboard-btn" onClick={goToDashboard}>View Dashboard</button>
        </div>
      </div>

      
      {filteredPatients.length > 0 && (
        <div className="saved-details-container">
          {filteredPatients.map((patient, index) => (
            <div key={index} className="saved-details">
              <h3>Saved Patient Details:</h3>
              <p><strong>Name:</strong> {patient.patientName}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Last Check-up:</strong> {patient.checkupDate}</p>
              <div className="button-group">
                <button className="edit-btn" onClick={() => handleEdit(index)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(index)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientSelectionPage;
