import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class VehicleRegistration {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    license!: string
    
    @Column({ type: "varchar" })
    serial!: string
}