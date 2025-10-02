import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Employee } from "./Employee";
import { Vehicle } from "./Vehicle";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "varchar" })
    name!: string
    
    @Column({ type: "varchar" })
    address!: string

    @OneToMany(() => Employee, employee => employee.company)
    employees: Employee[];

    @OneToMany(() => Vehicle, vehicle => vehicle.company)
    vehicles: Vehicle[];
}