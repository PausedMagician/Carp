import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { PersonalDetails } from "./PersonalDetails";
import { Company } from "./Company";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    username: string
    
    @Column({ type: "varchar" })
    password: string
    
    @Column({ type: "varchar" })
    email: string
    
    @Column({ type: "varchar" })
    department: string
    
    @OneToOne(() => PersonalDetails)
    @JoinColumn()
    personal_details: PersonalDetails

    @ManyToOne(() => Company)
    company: Company
}