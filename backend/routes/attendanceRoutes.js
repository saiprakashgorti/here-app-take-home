const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

/**
 * @swagger
 * /attendance/{uin}:
 *   get:
 *     summary: Get attendance records by UIN
 *     description: Retrieve all attendance records for a specific student by their UIN.
 *     parameters:
 *       - name: uin
 *         in: path
 *         required: true
 *         description: UIN of the student
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success - Returns an array of attendance records.
 *       500:
 *         description: Internal Server Error.
 */
// Route to get attendance by UIN
router.get('/:uin', attendanceController.getAttendanceByUin);

/**
 * @swagger
 * /attendance/add-attendance-records:
 *   post:
 *     summary: Add attendance records
 *     description: Add new attendance records for a student based on the class schedule within a specified date range based on the class schedule.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uin:
 *                 type: string
 *                 description: Unique Identifier Number of the student (UIN).
 *               netId:
 *                 type: string
 *                 description: Network ID of the student.
 *               classId:
 *                 type: string
 *                 description: Class ID for which attendance is being recorded.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the range (YYYY-MM-DD).
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the range (YYYY-MM-DD).
 *               takenBy:
 *                 type: string
 *                 description: The person who recorded the attendance.
 *     responses:
 *       200:
 *         description: Attendance records added successfully.
 */
// Route to add attendance records
router.post('/add-attendance-records', attendanceController.addAttendanceRecords);

/**
 * @swagger
 * /attendance/delete-attendance-records:
 *   delete:
 *     summary: Delete attendance records
 *     description: Delete attendance records for a student within a specified date range.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uin:
 *                 type: string
 *                 description: Unique Identifier Number of the student (UIN).
 *               classId:
 *                 type: string
 *                 description: Class ID for which attendance is being deleted.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the range (YYYY-MM-DD).
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the range (YYYY-MM-DD).
 *
*     responses:
*       200:
*         description: Attendance records deleted successfully.
*       404:
*         description: No attendance records found for deletion.
 */
// Route to delete attendance records
router.delete('/delete-attendance-records', attendanceController.deleteAttendanceRecords);

/**
* @swagger
* /attendance/waive-attendance:
*   patch:
*     summary: Waive attendance records
*     description: Waive attendance records for a student based on the class schedule within a specified date range based on the class schedule.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               uin:
*                 type: string
*                 description: Unique Identifier Number of the student (UIN).
*               netId:
*                 type: string
*                 description: Network ID of the student.
*               classId:
*                 type: string
*                 description: Class ID for which attendance is being waived.
*               startDate:
*                 type: string
*                 format: date
*                 description: Start date of the range (YYYY-MM-DD).
*               endDate:
*                 type: string
*                 format: date
*                 description: End date of the range (YYYY-MM-DD).
*               reasonForWaiving:
*                 type: string
*                 description: Reason for waiving the attendance.
*
*     responses:
*       200:
*         description: Attendance records waived successfully.
 */
// Route to waive attendance
router.patch('/waive-attendance', attendanceController.waiveAttendance);

module.exports = router;
