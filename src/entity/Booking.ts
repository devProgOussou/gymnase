import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
import { Resource } from "./Resource"

@Entity()
export class Booking {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  startTime!: Date

  @Column()
  endTime!: Date

  @ManyToOne(() => User, user => user.bookings)
  user!: User

  @ManyToOne(() => Resource, resource => resource.bookings)
  resource!: Resource

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

}
