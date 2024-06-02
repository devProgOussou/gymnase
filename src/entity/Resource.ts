import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Booking } from "./Booking";

@Entity()
export class Resource {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  type!: string

  @Column({ nullable: true })
  description?: string

  @Column({ default: true })
  isAvailable: boolean = true

  @Column()
  location!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @OneToMany(() => Booking, booking => booking.resource)
  bookings!: Booking[]

}
