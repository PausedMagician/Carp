import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class VehicleTransmission {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    type: string
    
    @Column({ type: "varchar" })
    drive: string
}