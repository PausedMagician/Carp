import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { VehicleRegistration } from "./VehicleRegistration";
import { VehicleSpec } from "./VehicleSpec";
import { Booking } from "./Booking";
import { Company } from "./Company";
import { Maintenance } from "./Maintenance";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    make: string
    
    @Column({ type: "varchar" })
    model: string

    @Column({ type: "varchar" })
    variant: string

    @Column({ type: "varchar" })
    color: string

    @Column({ type: "varchar" })
    type: string

    @Column({ type: "int" })
    year: number

    @OneToOne(() => VehicleRegistration, registration => registration.vehicle, { eager: true, cascade: true })
    @JoinColumn()
    registration: VehicleRegistration

    @ManyToOne(() => VehicleSpec, spec => spec.vehicles, { eager: true, cascade: true })
    @JoinColumn()
    spec: VehicleSpec;

    @OneToMany(() => Booking, booking => booking.vehicle, { nullable: true })
    bookings: Booking[];
    
    @ManyToOne(() => Company, company => company.vehicles)
    company: Company;

    @OneToMany(() => Maintenance, maintenance => maintenance.vehicle, { nullable: true })
    maintenanceRecords: Maintenance[];
}