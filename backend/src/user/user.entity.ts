import {
    Entity, Column, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn,
} from "typeorm";

import { Workspace } from "@workspace/workspace.entity";

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

    @ManyToMany((type) => Workspace, (workspace) => workspace.members)
    joinedWorkspaces: Workspace[];

    @OneToMany((type) => Workspace, (workspace) => workspace.owner)
    ownWorkspaces: Workspace[];
}

export class UserWithDetails extends User {
    details: UserDetails;
}
