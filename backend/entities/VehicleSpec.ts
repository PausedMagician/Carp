import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { VehicleTransmission } from "./VehicleTransmission";

@Entity()
export class VehicleSpec {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "int" })
    horse_power: number
    
    @Column({ type: "float" })
    top_speed: number
    
    @Column({ type: "float" })
    mileage: number

    @Column({ type: "boolean" })
    trailer_hitch: boolean
    
    @Column({ type: "varchar" })
    fuel_type: string
    
    @Column({ type: "varchar" })
    tyres: string

    @ManyToOne(() => VehicleTransmission)
    transmission: VehicleTransmission
}