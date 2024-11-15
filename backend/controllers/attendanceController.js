const Attendance = require('../models/Attendance');
const moment = require('moment');
const classSchedule = require('../utils/classSchedule');

// Controller to Get Attendance by UIN
const getAttendanceByUin = async (req, res) => {
    try {
        const attendance = await Attendance.find({ uin: req.params.uin });
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to Add Attendance Records
const addAttendanceRecords = async (req, res) => {
    const { uin, netId, classId, startDate, endDate, takenBy } = req.body;

    try {
        const start = moment(startDate).startOf('day');
        const end = moment(endDate).endOf('day');

        const datesToCreate = [];

        let currentDate = start.clone();
        while (currentDate.isSameOrBefore(end)) {
            const dayOfWeek = currentDate.format('dddd');

            if (classSchedule.days.includes(dayOfWeek)) {
                const classTime = moment(currentDate.format('YYYY-MM-DD') + `T${classSchedule.time}:00.000Z`);
                datesToCreate.push(classTime.toDate());
            }

            currentDate.add(1, 'day');
        }

        if (datesToCreate.length === 0) {
            return res.json({ message: 'No matching class dates found in the specified range.' });
        }

        const attendanceRecords = datesToCreate.map(date => ({
            uin,
            netId,
            classId,
            date,
            takenBy
        }));

        await Attendance.insertMany(attendanceRecords);

        res.json({ message: 'Attendance records added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to Delete Attendance Records
const deleteAttendanceRecords = async (req, res) => {
    const { uin, classId, startDate, endDate } = req.body;

    try {
        const start = new Date(startDate);
        const end = new Date(endDate);

        start.setUTCHours(0, 0, 0, 0); // Setting start date to midnight UTC
        end.setUTCHours(23, 59, 59, 999); // Setting end date to just before midnight UTC

        const query = {
            uin,
            classId,
            date: { $gte: start, $lte: end }
        };

        const matchedRecords = await Attendance.find(query);

        if (matchedRecords.length > 0) {
            const result = await Attendance.deleteMany(query);
            res.json({
                message: 'Attendance records deleted successfully',
                deletedCount: result.deletedCount
            });
        } else {
            res.json({ message: 'No attendance records found for deletion' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
};

// Controller to Waive Attendance for a Time Range
const waiveAttendance = async (req, res) => {
    const { uin, netId, classId, startDate, endDate, reasonForWaiving, waivedBy } = req.body;

    try {
        const start = moment(startDate).startOf('day');
        const end = moment(endDate).endOf('day');

        const datesToCreateOrUpdate = [];

        let currentDate = start.clone();
        while (currentDate.isSameOrBefore(end)) {
            const dayOfWeek = currentDate.format('dddd');

            if (classSchedule.days.includes(dayOfWeek)) {
                const classTime = moment(currentDate.format('YYYY-MM-DD') + `T${classSchedule.time}:00.000Z`);
                datesToCreateOrUpdate.push(classTime.toDate());
            }

            currentDate.add(1, 'day');
        }

        if (datesToCreateOrUpdate.length === 0) {
            return res.json({ message: 'No matching class dates found in the specified range.' });
        }

        for (const date of datesToCreateOrUpdate) {
            const existingRecord = await Attendance.findOne({ uin, classId, date });

            if (existingRecord) {
                await Attendance.updateOne(
                    { uin, classId, date },
                    { $set: { isWaived: true, reasonForWaiving } }
                );
            } else {
                await Attendance.create({
                    uin,
                    netId,
                    classId,
                    date,
                    waivedBy,
                    isWaived: true,
                    reasonForWaiving
                });
            }
        }

        res.json({ message: 'Attendance records created or waived successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAttendanceByUin,
    addAttendanceRecords,
    deleteAttendanceRecords,
    waiveAttendance
};
