import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity } from "typeorm"
import * as bcrypt from 'bcrypt';
import { Booking } from "./Booking"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column({ unique: true })
    email!: string

    @Column()
    password!: string

    @Column({ default: "user" })
    role: string = "user"

    @Column({ default: true })
    isActive: boolean = true

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @OneToMany(() => Booking, booking => booking.user)
    bookings!: Booking[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
