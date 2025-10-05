import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from 'cors';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { createCompany, getCompany, getCompanys, updateCompany, deleteCompany } from "./controllers/CompanyController";
import { createBooking, getBooking, getBookings, updateBooking, deleteBooking } from "./controllers/BookingController";
import { createEmployee, getEmployee, getEmployees, updateEmployee, deleteEmployee, login } from "./controllers/EmployeeController";
import { createLog, getLog, getLogs, updateLog, deleteLog } from "./controllers/LogController";
import { createMaintenance, getMaintenance, getMaintenances, updateMaintenance, deleteMaintenance } from "./controllers/MaintenanceController";
import { createVehicle, getVehicle, getVehicles, updateVehicle, deleteVehicle, getAvailableVehicles, getVehicleBookingsById } from "./controllers/VehicleController";
import { AppDataSource } from "./AppDataSource";
import { MockData } from "./Data/MockData";
import { getVehicleImage } from "./controllers/ImageController";

// Create a new express application instance
const app = express();

app.use(cors());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Carp Fleet Management API',
            version: '1.0.0',
            description: 'A fleet management system API for vehicles, employees, bookings, and maintenance',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./controllers/*.ts', './entities/*.ts'], // paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/v1.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});

try {
    AppDataSource.initialize().then(() => {
        // If app data source has 0 records in the vehicle table, then create mock data
        AppDataSource.getRepository("vehicle").count().then((count) => {
            if (count === 0) {
                MockData.create();
            }
        });
    });
} catch (error) {
    console.log(error);
}

// Set the network port
const port = Number.parseInt(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";

// JSON Middleware
app.use(express.json());

// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

// Company
app.post('/companies', createCompany);
app.get('/companies', getCompanys);
app.get('/companies/:id', getCompany);
app.put('/companies', updateCompany);
app.delete('/companies', deleteCompany);

// Booking
app.post('/bookings', createBooking);
app.get('/bookings', getBookings);
app.get('/bookings/:id', getBooking);
app.put('/bookings', updateBooking);
app.delete('/bookings', deleteBooking);

// Employee
app.post('/employees', createEmployee);
app.post('/employees/login', login);
app.get('/employees', getEmployees);
app.get('/employees/:id', getEmployee);
app.put('/employees', updateEmployee);
app.delete('/employees', deleteEmployee);

// Log
app.post('/logs', createLog);
app.get('/logs', getLogs);
app.get('/logs/:id', getLog);
app.put('/logs', updateLog);
app.delete('/logs', deleteLog);

// Maintenance
app.post('/maintenances', createMaintenance);
app.get('/maintenances', getMaintenances);
app.get('/maintenances/:id', getMaintenance);
app.put('/maintenances', updateMaintenance);
app.delete('/maintenances', deleteMaintenance);

// Vehicle
app.post('/vehicles', createVehicle);
app.get('/vehicles', getVehicles);
app.get('/vehicles/:id', getVehicle);
app.get('/vehicles-available', getAvailableVehicles);
app.get('/vehicles/available/:id', getVehicleBookingsById); // Subject to change
app.put('/vehicles', updateVehicle);
app.delete('/vehicles', deleteVehicle);

// Images
app.get('/images/vehicles/:id', getVehicleImage);



app.listen(port, host, () => {
    console.log(`The server is running at http://${host}:${port}`);
});