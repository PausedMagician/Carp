import "reflect-metadata";
import express, { Request, Response } from "express";
import { createCompany, getCompany, getCompanys, updateCompany, deleteCompany } from "./controllers/CompanyController";
import { createBooking, getBooking, getBookings, updateBooking, deleteBooking } from "./controllers/BookingController";
import { createEmployee, getEmployee, getEmployees, updateEmployee, deleteEmployee } from "./controllers/EmployeeController";
import { createLog, getLog, getLogs, updateLog, deleteLog } from "./controllers/LogController";
import { createMaintenance, getMaintenance, getMaintenances, updateMaintenance, deleteMaintenance } from "./controllers/MaintenanceController";
import { createVehicle, getVehicle, getVehicles, updateVehicle, deleteVehicle } from "./controllers/VehicleController";
import { AppDataSource } from "./AppDataSource";
import { MockData } from "./Data/MockData";

// Create a new express application instance
const app = express();

try {
    AppDataSource.initialize().then(() => {
        MockData.create();
    });
} catch (error) {
    console.log(error);
}

// Set the network port
const port = process.env.PORT || 3000;

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
app.put('/vehicles', updateVehicle);
app.delete('/vehicles', deleteVehicle);



app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});