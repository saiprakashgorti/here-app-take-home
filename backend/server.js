const express = require('express');
const connectDB = require('./config/db');
const attendanceRoutes = require('./routes/attendanceRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/attendance', attendanceRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
    const healthCheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        cpuLoad: os.loadavg(),
        memoryUsage: {
            total: os.totalmem(),
            free: os.freemem()
        },
        nodeVersion: process.version,
        platform: process.platform,
    };

    try {
        res.status(200).json(healthCheck);
    } catch (error) {
        healthCheck.message = error;
        res.status(503).json(healthCheck);
    }
});

// Error Handling Middleware
app.use(errorHandler);

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Student Attendance API',
            version: '1.0.0',
            description: 'API for managing student attendance records',
            contact: {
                name: 'Developer',
                email: 'developer@example.com'
            },
            servers: [
                {
                    url: 'http://localhost:5500',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server and export the server instance for testing
const PORT = process.env.PORT || 5500;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server; // Export the server instance