import {
    Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "../user/user.entity";

@Entity()
export class UserDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    displayName: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Index()
    @OneToOne((type) => User, {
        nullable: false, onDelete: "CASCADE",
    })
    @JoinColumn({ name: "userId" })
    user: User;
}
