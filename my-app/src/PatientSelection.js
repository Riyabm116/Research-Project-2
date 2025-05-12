import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PatientSelectionPage = () => {
  const navigate = useNavigate();


  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [checkupDate, setCheckupDate] = useState("");


  const [savedDetails, setSavedDetails] = useState(null);


  const handleSave = () => {
    if (patientName && age && checkupDate) {
      const patientData = { patientName, age, checkupDate };

      
      setSavedDetails(patientData);

      
      setPatientName("");
      setAge("");
      setCheckupDate("");

      alert("✅ Patient details saved successfully!");
    } else {
      alert("⚠ Please fill in all the fields before saving.");
    }
  };

  const handleEdit = () => {
    if (savedDetails) {
      setPatientName(savedDetails.patientName);
      setAge(savedDetails.age);
      setCheckupDate(savedDetails.checkupDate);
      setSavedDetails(null); 
    }
  };
  
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete the saved patient details?");
    if (confirmDelete) {
      setSavedDetails(null);
    }
  };
  

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="top-nav">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-btn">
          <FaSearch />
        </button>
        <button className="nav-btn" onClick={goToDashboard}>
          Dashboard
        </button>
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
          <button className="save-btn" onClick={handleSave}>
            Save Details
          </button>
          <button className="dashboard-btn" onClick={goToDashboard}>
            View Dashboard
          </button>
        </div>

 
        {savedDetails && (
          <div className="saved-details">
            <h3>Saved Patient Details:</h3>
            <p>
              <strong>Name:</strong> {savedDetails.patientName}
            </p>
            <p>
              <strong>Age:</strong> {savedDetails.age}
            </p>
            <p>
              <strong>Last Check-up:</strong> {savedDetails.checkupDate}
            </p>

            <div className="button-group">
               <button className="edit-btn" onClick={handleEdit}>✏️ Edit</button>
               <button className="delete-btn" onClick={handleDelete}>🗑️ Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientSelectionPage;