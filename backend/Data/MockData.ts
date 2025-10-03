import { AppDataSource } from "@/AppDataSource";
import { Booking } from "@/entities/Booking";
import { Company } from "@/entities/Company";
import { Employee } from "@/entities/Employee";
import { LogEntry } from "@/entities/LogEntry";
import { Maintenance } from "@/entities/Maintenance";
import { PersonalDetails } from "@/entities/PersonalDetails";
import { Vehicle } from "@/entities/Vehicle";
import { VehicleRegistration } from "@/entities/VehicleRegistration";
import { VehicleSpec } from "@/entities/VehicleSpec";
import { VehicleTransmission } from "@/entities/VehicleTransmission";

let companies: Company[] = [
	{
		id: 1,
		name: "Company A",
		address: "Address A",
		employees: [],
		vehicles: [],
	},
	{
		id: 2,
		name: "Company B",
		address: "Address B",
		employees: [],
		vehicles: [],
	},
];

//#region Vehicles
let registrations: VehicleRegistration[] = [
	{ id: 1, license: "AB12345", serial: "vf12rfl1h49621453", vehicle: null },
	{ id: 2, license: "AB11111", serial: "jdal701s001011911", vehicle: null },
];

let transmissions: VehicleTransmission[] = [
	{ id: 1, type: "Manual", drive: "FWD", specs: [] },
	{ id: 2, type: "Manual", drive: "FWD", specs: [] },
];

let specs: VehicleSpec[] = [
	{
		id: 1,
		horse_power: 90,
		top_speed: 171,
		mileage: 27.8,
		trailer_hitch: true,
		fuel_type: "Diesel",
		tyres: "Summer",
		transmission: transmissions[0],
		vehicles: [],
	},
	{
		id: 2,
		horse_power: 41,
		top_speed: 120,
		mileage: 20.0,
		trailer_hitch: false,
		fuel_type: "Petrol",
		tyres: "Summer",
		transmission: transmissions[1],
		vehicles: [],
	},
];

let vehicles: Vehicle[] = [
	{
		id: 1,
		make: "Renault",
		model: "Captur",
		variant: "Dci 90",
		color: "Black",
		type: "SUV",
		year: 2013,
		registration: registrations[0],
		spec: specs[0],
		bookings: [],
		company: companies[0],
		maintenanceRecords: [],
	},
	{
		id: 2,
		make: "Daihatsu",
		model: "Cuore",
		variant: "L201",
		color: "Red",
		type: "Car",
		year: 1999,
		registration: registrations[1],
		spec: specs[1],
		bookings: [],
		company: companies[0],
		maintenanceRecords: [],
	},
];
//#endregion Vehicles

//#region Employees
let personal_details: PersonalDetails[] = [
    {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        birthday: new Date("1990-01-01"),
    },
    {
        id: 2,
        first_name: "Jane",
        last_name: "Smith",
        birthday: new Date("1992-02-02"),
    },
];

let employees: Employee[] = [
	{
		id: 1,
		username: "john",
		password: "doe",
		company: {...companies[0]},
		department: "Idk",
		email: "john.doe@example.com",
		personal_details: personal_details[0],
		bookings: [],
		logEntries: [],
		maintenanceRecords: [],
	},
	{
		id: 2,
		username: "jane",
		password: "smith",
		company: {...companies[1]},
		department: "Idk",
		email: "jane.smith@example.com",
		personal_details: personal_details[1],
		bookings: [],
		logEntries: [],
		maintenanceRecords: [],
	},
];
//#endregion Employees

//#region Maintenance
let maintenance: Maintenance[] = [
    {
        id: 1,
        reason: "Oil change",
        status: "Planned",
        log: "Changed oil and filter",
        planned_at: new Date("2023-10-01"),
        planned_for: new Date("2023-10-02"),
        done_at: new Date("2023-10-02"),
        vehicle: vehicles[0],
        reportee: employees[0]
    },
    {
        id: 2,
        reason: "Tire rotation",
        status: "Planned",
        log: "Rotate tires every 5000 miles",
        planned_at: new Date("2023-10-01"),
        planned_for: new Date("2023-10-02"),
        done_at: null,
        vehicle: vehicles[1],
        reportee: employees[1]
    }
];
//#endregion Maintenance

//#region Bookings
let bookings: Booking[] = [
	{
		id: 1,
		purpose: "Driving daughter to school",
		booking_status: "Finished",
		destination: "School",
		start_date: new Date("2023-09-01T08:00:00Z"),
		end_date: new Date("2023-09-01T09:00:00Z"),
		employee: employees[0],
		vehicle: vehicles[0],
		logEntries: []
	},
	{
		id: 2,
		purpose: "Getting daughter from school",
		booking_status: "Planned",
		destination: "School",
		start_date: new Date("2023-09-01T15:00:00Z"),
		end_date: new Date("2023-09-01T16:00:00Z"),
		employee: employees[0],
		vehicle: vehicles[0],
		logEntries: []
	}
];
//#endregion Bookings

//#region LogEntries
let logEntries: LogEntry[] = [
	{
		id: 1,
		from_location: "Home",
		to_location: "School",
		start_date: new Date("2023-09-01T08:00:00Z"),
		end_date: new Date("2023-09-01T09:00:00Z"),
		start_odometer: 10000,
		end_odometer: 10020,
		employee: employees[0],
		booking: bookings[0]
	},
];


export class MockData {
	static async create() {
		const vehicleRepo = AppDataSource.getRepository(Vehicle);
		const companyRepo = AppDataSource.getRepository(Company);
		const registrationRepo =
			AppDataSource.getRepository(VehicleRegistration);
		const specRepo = AppDataSource.getRepository(VehicleSpec);
		const transmissionRepo =
			AppDataSource.getRepository(VehicleTransmission);

		await companyRepo.save(companies);
		await transmissionRepo.save(transmissions);
		await specRepo.save(specs);
		await registrationRepo.save(registrations);
		await vehicleRepo.save(vehicles);

        const personalDetailsRepo = AppDataSource.getRepository(PersonalDetails);
        const employeeRepo = AppDataSource.getRepository(Employee);

        await personalDetailsRepo.save(personal_details);
        await employeeRepo.save(employees);

        const maintenanceRepo = AppDataSource.getRepository(Maintenance);
        await maintenanceRepo.save(maintenance);

		const bookingRepo = AppDataSource.getRepository(Booking);
		await bookingRepo.save(bookings);

		const logRepo = AppDataSource.getRepository(LogEntry);
		await logRepo.save(logEntries);
    }
}
