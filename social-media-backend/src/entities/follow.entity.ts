// create a follow entity
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Follow {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne((type) => User, (user) => user.followers)
    follower: User;

    @ManyToOne((type) => User, (user) => user.following)
    following: User;
}
