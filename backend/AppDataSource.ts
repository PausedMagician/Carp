import { DataSource } from "typeorm";
import { Company } from "./entities/Company";

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [Company],
    subscribers: [],
    migrations: [],
})