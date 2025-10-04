import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    @JoinColumn({ name: "employee_id" })
    employee: Employee;

    @Column({ type: "int", nullable: true, name: "employee_id" })
    employeeId: number | null;

    @ManyToOne(() => Booking, booking => booking.logEntries, { nullable: true })
    @JoinColumn({ name: "booking_id" })
    booking: Booking | null;

    @Column({ type: "int", nullable: true, name: "booking_id" })
    bookingId: number | null;

}