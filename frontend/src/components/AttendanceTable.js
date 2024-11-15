import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AttendanceModal from './AttendanceModal';
import '../App.css';

const AttendanceTable = ({ uin }) => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null); // this can be used to change the student UIN and get records for that student

    const classSchedule = {
        days: ['Monday', 'Wednesday'],
        time: '14:00'
    };


    useEffect(() => {
        const fetchAttendanceRecords = async () => {
            try {
                const response = await axios.get(`/${uin}`);
                setAttendanceRecords(response.data);
            } catch (err) {
                console.error('Error fetching attendance records:', err);
            }
        };

        fetchAttendanceRecords();
    }, [uin]);

    const handleOpenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRecord(null);
    };

    return (
        <div class='attendance-table-container'>
            <div class="buttons-and-class-schedule">
                <span>
                    <h2>Attendance Records for Student {uin}</h2>
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal('add')}>
                        Add Attendance Range
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleOpenModal('remove')} style={{ marginLeft: '10px' }}>
                        Remove Attendance Range
                    </Button>
                    <Button variant="outlined" color="warning" onClick={() => handleOpenModal('waive')} style={{ marginLeft: '10px' }}>
                        Waive Attendance Range
                    </Button>
                </span>

                <span className="schedule-container">
                    <h3>Class Schedule:</h3>
                    <ul>
                        {classSchedule.days.map((day, index) => (
                            <li key={index}>
                                {day}: Class at {classSchedule.time}
                            </li>
                        ))}
                    </ul>
                </span>
            </div>


            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell class='head'>S.No</TableCell>
                            <TableCell class='head'>Net ID</TableCell>
                            <TableCell class='head'>UIN</TableCell>
                            <TableCell class='head'>Class ID</TableCell>
                            <TableCell class='head'>Date</TableCell>
                            <TableCell class='head'>Taken By</TableCell>
                            <TableCell class='head'>Waived</TableCell>
                            <TableCell class='head'>Waived By</TableCell>
                            <TableCell class='head'>Reason for Waiving</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendanceRecords.map((record, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{record.netId}</TableCell>
                                <TableCell>{record.uin}</TableCell>
                                <TableCell>{record.classId}</TableCell>
                                <TableCell>{new Date(record.date).toDateString()}</TableCell>
                                <TableCell>{record.takenBy}</TableCell>
                                <TableCell>{record.isWaived ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{record.waivedBy}</TableCell>
                                <TableCell>{record.reasonForWaiving}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {isModalOpen && (
                <AttendanceModal
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                    type={modalType}
                    uin={uin}
                    refreshData={() => axios.get(`/${uin}`).then(res => setAttendanceRecords(res.data))}
                />
            )}
        </div>
    );
};

export default AttendanceTable;