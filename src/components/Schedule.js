import React from 'react'
import './schedule.css'
// import { FaBars, FaHome, FaUser } from 'react-icons/fa';
const Schedule = () => {
    const showAddScheduleForm = () => {
        document.getElementById('addScheduleForm').style.display = 'block';
      };
    
      const hideAddScheduleForm = () => {
        document.getElementById('addScheduleForm').style.display = 'none';
      };
    
  return (
    <div>
    <div className="navigation-bar">
      <button className="hamburger-button">
        {/* <FaBars /> */}
      </button>
      <button className="home-button">
        {/* <FaHome /> */}
      </button>
      <button className="user-profile-button">
        {/* <FaUser /> */}
      </button>
    </div>
    <div className="container">
      <div className="content-area">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Date</th>
              <th>Description</th>
              <th>Assigned to</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with time schedule data */}
            
            {/* Add more table rows as needed */}
          </tbody>
        </table>
        <button className="add-button" onClick={showAddScheduleForm}>
          Add New Time Schedule
        </button>
        <div id="addScheduleForm" className="add-schedule-form">
          <h2>Add New Time Schedule</h2>
          <form>
            <label htmlFor="no">No.:</label>
            <input type="text" id="no" name="no" required />
            <br />
            <label htmlFor="date">Date:</label>
            <input type="text" id="date" name="date" required />
            <br />
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" required />
            <br />
            <label htmlFor="assignedTo">Assigned to:</label>
            <input type="text" id="assignedTo" name="assignedTo" required />
            <br />
            <label htmlFor="startTime">Start Time:</label>
            <input type="text" id="startTime" name="startTime" required />
            <br />
            <label htmlFor="endTime">End Time:</label>
            <input type="text" id="endTime" name="endTime" required />
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick={hideAddScheduleForm}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
 
  </div>
  )
}

export default Schedule
