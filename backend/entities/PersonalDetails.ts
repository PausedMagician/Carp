import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToOne } from "typeorm";

@Entity()
export class PersonalDetails {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    first_name: string
    
    @Column({ type: "varchar" })
    last_name: string

    @Column({ type: "date" })
    birthday: Date
}