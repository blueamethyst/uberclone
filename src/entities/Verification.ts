import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne } from 'typeorm'
import { verificationTarget } from "src/types/types";
import User from './User';

@Entity()
class Verification extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text", enum: ["EMAIL", "PHONE"] })
    target: verificationTarget;

    @Column({ type: "text" })
    payload: string;


    @BeforeInsert()
    createKey(): void {
        if (this.target === "PHONE") {
            this.key = Math.floor(Math.random() * 10000).toString();
        } else if (this.target == "EMAIL") {
            this.key = Math.random().toString(36).substr(2);
        }
    }

    @Column({ type: "text" })
    key: string;

    @ManyToOne(type => User, user => user.verifications)
    user: User;

    @Column({ type: "boolean", default: false })
    verified: boolean;

    @CreateDateColumn()
    createAt: string;

    @UpdateDateColumn()
    updateAt: string;
}

export default Verification;
