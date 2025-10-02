import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, OneToMany, ManyToOne } from "typeorm";
import { Employee } from "./Employee";
import { Vehicle } from "./Vehicle";

@Entity()
export class Maintenance {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    reason: string
    
    @Column({ type: "varchar" })
    status: string
    
    @Column({ type: "varchar" })
    log: string
    
    @Column({ type: "datetime" })
    planned_at: Date
    
    @Column({ type: "datetime" })
    planned_for: Date
    
    @Column({ type: "datetime" })
    done_at: Date
    
    @ManyToOne(() => Vehicle, vehicle => vehicle.maintenanceRecords)
    vehicle: Vehicle

    @ManyToOne(() => Employee, employee => employee.maintenanceRecords, { nullable: true })
    reportee: Employee | null;
}