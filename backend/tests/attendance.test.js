const request = require('supertest');
const server = require('../server'); // Import the server instance

describe('Attendance API', () => {
    it('should get all attendance records for a student', async () => {
        const response = await request(server).get('/attendance/12345678');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should add attendance records based on class schedule', async () => {
        const response = await request(server)
            .post('/attendance/add-attendance-records')
            .send({
                uin: '12345678',
                netId: 'student001',
                classId: 'CS411',
                startDate: '2024-11-10',
                endDate: '2024-11-14',
                takenBy: 'TA001'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Attendance records added successfully');
    });

    it('should remove attendance records in a date range', async () => {
        const response = await request(server)
            .delete('/attendance/delete-attendance-records')
            .send({
                uin: '12345678',
                classId: 'CS411',
                startDate: '2024-11-15',
                endDate: '2024-11-20'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('No attendance records found for deletion');
    });

    it('should waive attendance records based on class schedule', async () => {
        const response = await request(server)
            .patch('/attendance/waive-attendance')
            .send({
                uin: '12345678',
                netId: 'student001',
                classId: 'CS411',
                startDate: '2024-11-10',
                endDate: '2024-11-14',
                reasonForWaiving: 'Medical Leave',
                waivedBy: 'TA001'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Attendance records created or waived successfully');
    });
});