import { DataSource } from "typeorm";
import { Company } from "./entities/Company";
import { Employee } from "./entities/Employee";
import { PersonalDetails } from "./entities/PersonalDetails";
import { Vehicle } from "./entities/Vehicle";
import { VehicleRegistration } from "./entities/VehicleRegistration";
import { VehicleSpec } from "./entities/VehicleSpec";
import { VehicleTransmission } from "./entities/VehicleTransmission";

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [Company, Employee, PersonalDetails, Vehicle, VehicleRegistration, VehicleSpec, VehicleTransmission],
    subscribers: [],
    migrations: [],
})