import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
import { Vehicle } from "./Vehicle";
import { LogEntry } from "./LogEntry";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    purpose: string
    
    @Column({ type: "varchar" })
    booking_status: string
    
    @Column({ type: "varchar" })
    destination: string
    
    @Column({ type: "date" })
    start_date: Date
    
    @Column({ type: "date" })
    end_date: Date

    @ManyToOne(() => Employee, employee => employee.bookings)
    employee: Employee

    @ManyToOne(() => Vehicle, vehicle => vehicle.bookings)
    vehicle: Vehicle

    @OneToMany(() => LogEntry, logEntry => logEntry.booking)
    logEntries: LogEntry[];
}