import React, { useState } from 'react';
import AttendanceTable from './components/AttendanceTable';
import AttendanceModal from './components/AttendanceModal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type] = useState('');

  // Function to close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <h1>Student Attendance Management</h1>
      <AttendanceTable uin='12345678'/>
      <AttendanceModal open={isModalOpen} handleClose={handleCloseModal} type={type} />
    </div>
  );
}

export default App;