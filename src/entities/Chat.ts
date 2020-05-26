import { Entity, BaseEntity, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm'
import Message from './Message';
import User from './User';

@Entity()
class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Message, message => message.chat)
    messages: Message[];

    @OneToMany(type => User, user => user.chat)
    paticipants: User[];

    @CreateDateColumn()
    createAt: string;

    @UpdateDateColumn()
    updateAt: string;
}

export default Chat;
