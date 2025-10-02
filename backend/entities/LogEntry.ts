import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
import { Vehicle } from "./Vehicle";
import { Booking } from "./Booking";

@Entity()
export class LogEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    from_location: string;

    @Column({ type: "varchar" })
    to_location: string;

    @Column({ type: "datetime" })
    start_date: Date;
    
    @Column({ type: "datetime" })
    end_date: Date;

    @Column({ type: "float" })
    start_odometer: number;

    @Column({ type: "float" })
    end_odometer: number;

    @ManyToOne(() => Employee, employee => employee.logEntries)
    employee: Employee;

    @ManyToOne(() => Booking, booking => booking.logEntries, { nullable: true })
    booking: Booking | null;

}