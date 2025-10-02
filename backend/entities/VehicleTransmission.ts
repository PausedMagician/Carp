import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { VehicleSpec } from "./VehicleSpec";

@Entity()
export class VehicleTransmission {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    type: string
    
    @Column({ type: "varchar" })
    drive: string
    
    @OneToMany(() => VehicleSpec, spec => spec.transmission)
    specs: VehicleSpec[];
}