import { DataSource } from "typeorm";
import { Company } from "./entities/Company";
import { Employee } from "./entities/Employee";
import { PersonalDetails } from "./entities/PersonalDetails";
import { Vehicle } from "./entities/Vehicle";
import { VehicleRegistration } from "./entities/VehicleRegistration";
import { VehicleSpec } from "./entities/VehicleSpec";
import { VehicleTransmission } from "./entities/VehicleTransmission";
import { Maintenance } from "./entities/Maintenance";
import { Booking } from "./entities/Booking";
import { LogEntry } from "./entities/LogEntry";

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [Company, Employee, PersonalDetails, Vehicle, VehicleRegistration, VehicleSpec, VehicleTransmission, Maintenance, Booking, LogEntry],
    subscribers: [],
    migrations: [],
})