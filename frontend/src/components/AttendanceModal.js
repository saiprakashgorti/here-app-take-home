import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from '../api/axios';
import '../App.css';

const AttendanceModal = ({ open, handleClose, type, uin, refreshData }) => {
    const netId='student001';
    const classId='CS411';
    const [setUIN] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [takenBy, setTakenBy] = useState('');
    const [waivedBy, setWaivedBy] = useState('');
    const [reasonForWaiving, setReasonForWaiving] = useState('');

    const handleSubmit = async () => {
        try {
            if (type === 'add') {
                await axios.post('/add-attendance-records', { uin, netId, classId, startDate, endDate, takenBy });
            } else if (type === 'remove') {
                await axios.delete('/delete-attendance-records', { data: { uin, classId, startDate, endDate } });
            } else if (type === 'waive') {
                await axios.patch('/waive-attendance', { uin, netId, classId, startDate, endDate, reasonForWaiving, waivedBy});
            }

            refreshData();
            handleClose();
        } catch (error) {
            console.error(`Error ${type === 'add' ? 'adding' : type === 'remove' ? 'removing' : 'waiving'} attendance:`, error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ padding: '20px', backgroundColor: 'white', width: '400px', margin: '100px auto' }}>
                <h2>{type === 'add' ? 'Add' : type === 'remove' ? 'Remove' : 'Waive'} Attendance Range</h2>

                <TextField
                    label="UIN"
                    fullWidth
                    value={uin}
                    onChange={(e) => setUIN(e.target.value)}
                    margin="normal"
                />

                <TextField
                    label="Start Date"
                    type="date"
                    fullWidth
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="End Date"
                    type="date"
                    fullWidth
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {type === 'add' && (
                    <TextField
                        label="Attendance Taken By"
                        fullWidth
                        value={takenBy}
                        onChange={(e) => setTakenBy(e.target.value)}
                        margin="normal"
                    />
                )}

                {type === 'waive' && (
                    <TextField
                        label="Attendance Waived By"
                        fullWidth
                        value={waivedBy}
                        onChange={(e) => setWaivedBy(e.target.value)}
                        margin="normal"
                    />
                )}
                {type === 'waive' && ( 
                    <TextField
                        label="Reason for Waiving"
                        fullWidth
                        value={reasonForWaiving}
                        onChange={(e) => setReasonForWaiving(e.target.value)}
                        margin="normal"
                    />
                )}

                <Button variant="contained" color={type === 'add' ? "primary" : type === "remove" ? "error" : "warning"} onClick={handleSubmit}>
                    {type === 'add' ? "Add Attendance" : type === "remove" ? "Remove Attendance" : "Waive Attendance"}
                </Button>
                <Button style={{margin: 12}} variant="outlined" color={"error"} onClick={handleClose}>Cancel</Button>
            </Box>
        </Modal>
    );
};

export default AttendanceModal;