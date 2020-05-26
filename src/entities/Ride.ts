import { Entity, BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { rideStatus } from 'src/types/types';
import User from './User';

@Entity()
class Ride extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text", enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"] })
    status: rideStatus;

    @Column({ type: "text" })
    pickUpAddress: string;

    @Column({ type: "double precision", default: 0 })
    pickUpLat: number;

    @Column({ type: "double precision", default: 0 })
    pickUpLng: number;

    @Column({ type: "text" })
    dropOffAddress: string;

    @Column({ type: "double precision", default: 0 })
    dropOffLat: number;

    @Column({ type: "double precision", default: 0 })
    dropOffLng: number;

    @Column({ type: "text" })
    price: string;

    @Column({ type: "text" })
    distance: string;

    @Column({ type: "text" })
    duration: string;

    @ManyToOne(type => User, user => user.rideAsPassenger)
    passenger: User;

    @ManyToOne(type => User, user => user.rideAsDriver)
    driver: User;

    @CreateDateColumn()
    createAt: string;

    @UpdateDateColumn()
    updateAt: string;
}

export default Ride;