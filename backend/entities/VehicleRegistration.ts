import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity()
export class VehicleRegistration {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    license!: string
    
    @Column({ type: "varchar" })
    serial!: string

    @OneToOne(() => Vehicle, vehicle => vehicle.registration)
    vehicle: Vehicle;
}