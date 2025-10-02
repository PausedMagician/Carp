import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "varchar" })
    name!: string
    
    @Column({ type: "varchar" })
    address!: string
}