import {
    Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from "typeorm";

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
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    email: string;

    @OneToOne((type) => UserDetails, {
        cascade: true,
    })
    @JoinColumn()
    details: UserDetails;
}

export class UserWithDetails extends User {
    details: UserDetails;
}
