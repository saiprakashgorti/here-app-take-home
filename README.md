Proposal for Attendance Management System
-----------------------------------------

This document outlines the architecture, design patterns, and features implemented in the **Attendance Management System**. The system is designed to efficiently manage student attendance records, following best practices and incorporating several advanced features.

Here is a working video of the app - [insert drive link]

1\. **Frontend Overview**
-------------------------

1.1 **Attendance Records Screen**
---------------------------------

*   The frontend provides a screen where all the **attendance records of a particular student** are displayed.
*   This screen allows users to view detailed attendance data for a specific student, including dates, class IDs, and whether the attendance has been waived.

1.2 **Student List Screen (Potential Future Work)**
---------------------------

*   Before navigating to the attendance records screen, we can build a screen that lists **all students registered in a particular course**.
*   Each student in the list has a button that allows users to navigate to their individual attendance records.
*   This provides a user-friendly interface for course administrators to quickly access and manage attendance for different students.

2\. **Attendance Management Features**
--------------------------------------

2.1 **Add Attendance (Configurable Class Schedule)**
----------------------------------------------------

*   The system allows users to **add attendance records** for a specific time range (e.g., from November 1st to November 14th).
*   However, instead of adding records for every day in that range, the system follows a **configurable class schedule**.
*   For example:
    
    *   If the class is held only on Mondays and Wednesdays at 2 PM, only those days will have attendance records created.
    *   For the given date range (November 1st to November 14th), **only four records** will be created (two Mondays and two Wednesdays).
    

Configurable Class Schedule Example:
------------------------------------

```javascript
const classSchedule = {
    days: ['Monday', 'Wednesday'],
    time: '14:00'
};
```

*   This configuration can be easily modified to match different class schedules.

2.2 **Delete Attendance with Extra Protection**
-----------------------------------------------

*   The system includes a feature to **delete attendance records over a specified date range**.
*   To add an extra layer of protection against accidental deletions, users are required to type `'Delete'` before confirming the deletion.
*   This approach was chosen over using a modal confirmation because having a modal on top of another modal is considered poor design practice.

2.3 **Waive Attendance**
------------------------

*   The system allows users to **waive attendance** for students who have legitimate reasons for being absent (e.g., medical leave).
*   When waiving attendance, new rows are added to the table with a column indicating that the attendance has been waived (`waived: yes`) along with the reason for waiving.
*   Similar to adding attendance, this feature follows the **configurable class schedule**, so only the days when classes are actually held will have their attendance waived.

3\. **Extra Features Implemented**
----------------------------------

3.1 **Hosted on Vercel**
------------------------

*   The application is hosted on **Vercel**, providing a scalable and secure environment for hosting both frontend and backend services.
    
    *   **URL**: [https://here-app-take-home.vercel.app/](https://here-app-take-home.vercel.app/)


3.2 **Swagger API Documentation**
---------------------------------

*   The system includes comprehensive API documentation using **Swagger**.
    
    *   Swagger UI is accessible at `/api-docs` (for now it is, `http://localhost:5500/api-docs`).
    

Benefits:
---------

*   Provides clear documentation of all available API endpoints.
*   Allows developers to test API endpoints directly from the browser using Swagger's interactive interface.

Example Swagger Endpoints:
--------------------------

*   `POST /attendance/add-attendance-records`: Add attendance records based on class schedule.
*   `DELETE /attendance/delete-attendance-records`: Delete attendance records within a specified date range.
*   `PATCH /attendance/waive-attendance`: Waive attendance records for a specific student.

3.3 **Middleware for Error Handling**
-------------------------------------

*   A custom error handling middleware has been implemented to standardize error responses across the entire application.

Features:
---------

*   Catches all unhandled errors and ensures they are logged and returned with appropriate HTTP status codes.
*   Provides detailed error messages in development while hiding sensitive information in production environments.

3.4 **Controller-Service-Routes Architecture**
----------------------------------------------

The system follows the **Controller-Service-Routes** architecture pattern:

1.  **Controller**: Handles incoming requests and delegates business logic to services or models.
2.  **Service/Model**: Manages data access and business logic (e.g., interacting with MongoDB).
3.  **Routes**: Defines API endpoints and links them to controllers.

This architecture ensures separation of concerns, making the codebase more maintainable and scalable.

3.5 **Added Test Cases for Backend and Frontend (Jest)**
----------------------------------------------

The project includes comprehensive test coverage using Jest for both backend and frontend components.

Can be accessed by running the command
```bash
npx jest --watchAll
```

4\. **MongoDB Connection Using MongoDB Atlas**
----------------------------------------------

The system uses MongoDB Atlas as its database provider. MongoDB Atlas is a cloud-based database service that provides high availability, scalability, and security.

Features:
---------

1.  The backend connects securely to MongoDB Atlas using credentials stored in environment variables (`MONGO_URI`).
2.  MongoDB Atlas provides automatic backups, monitoring tools, and scaling options that ensure data integrity and performance even under heavy load.

Example MongoDB Connection (`config/db.js`):
--------------------------------------------

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
```

Benefits:
---------

*   MongoDB Atlas provides automatic scaling based on traffic demands.
*   It offers built-in security features like encryption at rest and in transit.


How To Use This Project
-----------------------

Here’s how you can run this project locally:

1.  Clone the repository from GitHub:
    ```bash
    git clone https://github.com/saiprakashgorti/here-app-take-home.git
    ```
    
3.  Navigate into the backend folder:
    ```bash
    cd backend
    ```
    
5.  Install all required Node.js modules:
    ```bash
    npm install
    ```
6. Create a .env file in your backend and use the following ```MONGO_URI```
    ```
    MONGO_URI=mongodb+srv://saiprakashgorti:Z0d11vzirtOuOhDz@here-app.vppm8.mongodb.net/?retryWrites=true&w=majority&appName=here-app
    ```
7.  Start your server locally:
    ```bash
    node server.js
    ```
    
9.  Access your deployed version on Vercel:
    ```bash
    https://here-app-take-home.vercel.app/
    ```

Let me know if you need further clarification or help with any feature!
