import { IsEmail } from 'class-validator';
import bcrypt from 'bcrypt';
import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert } from 'typeorm';


const BCRYPT_ROUNDS = 10;

class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text", unique: true })
    @IsEmail()
    email: String;

    @Column({ type: "boolean", default: false })
    verifiedEmail: boolean;

    @Column({ type: "text" })
    firstName: string;

    @Column({ type: "text" })
    lasttName: string;

    @Column({ type: "int" })
    age: number;

    public comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

    private hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, BCRYPT_ROUNDS);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async savePassword(): Promise<void> {
        if (this.password) {
            const hashedPassword = await this.hashPassword(this.password);
            this.password = hashedPassword;
        }
    }

    @Column({ type: "text" })
    password: string;

    @Column({ type: "text" })
    phoneNumber: string;

    @Column({ type: "boolean", default: false })
    verifiedPhoneNumber: boolean;

    @Column({ type: "text" })
    profilePhoto: string;

    @Column({ type: "boolean", default: false })
    isDriving: boolean;

    @Column({ type: "boolean", default: false })
    isRiding: boolean;

    @Column({ type: "boolean", default: false })
    isTaken: boolean;

    @Column({ type: "double precision", default: 0 })
    lastLng: number;

    @Column({ type: "double precision", default: 0 })
    lastLat: number;

    @Column({ type: "double precision", default: 0 })
    lastOrientation: number;

    get fullName(): string { return `${this.firstName} ${this.lasttName}` }

    @CreateDateColumn()
    createAt: string;

    @UpdateDateColumn()
    updateAt: string;
}
export default User;
