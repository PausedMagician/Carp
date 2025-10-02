import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { VehicleRegistration } from "./VehicleRegistration";
import { VehicleSpec } from "./VehicleSpec";
import { Booking } from "./Booking";

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

    @OneToOne(() => VehicleRegistration)
    @JoinColumn()
    registration: VehicleRegistration

    @ManyToOne(() => VehicleSpec)
    @JoinColumn()
    spec: VehicleSpec

    @OneToMany(() => Booking, booking => booking.vehicle)
    bookings: Booking[];
}