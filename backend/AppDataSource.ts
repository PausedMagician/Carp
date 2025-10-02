import { DataSource } from "typeorm";
import { Company } from "./entities/Company";
import { Employee } from "./entities/Employee";
import { PersonalDetails } from "./entities/PersonalDetails";

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [Company, Employee, PersonalDetails],
    subscribers: [],
    migrations: [],
})