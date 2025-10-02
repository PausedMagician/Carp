import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PersonalDetails } from "./PersonalDetails";
import { Company } from "./Company";
import { Booking } from "./Booking";
import { LogEntry } from "./LogEntry";
import { Maintenance } from "./Maintenance";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    username: string
    
    @Column({ type: "varchar" })
    password: string
    
    @Column({ type: "varchar" })
    email: string
    
    @Column({ type: "varchar" })
    department: string
    
    @OneToOne(() => PersonalDetails, {eager: true})
    @JoinColumn()
    personal_details: PersonalDetails

    @ManyToOne(() => Company, company => company.employees)
    company: Company

    @OneToMany(() => Booking, bookings => bookings.employee)
    bookings: Booking[];

    @OneToMany(() => LogEntry, logEntries => logEntries.employee)
    logEntries: LogEntry[];
    
    @OneToMany(() => Maintenance, maintenance => maintenance.reportee, { nullable: true })
    maintenanceRecords: Maintenance[];
}