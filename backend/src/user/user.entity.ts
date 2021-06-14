import {
    CreateDateColumn, Column, Entity, Index, JoinColumn, ManyToMany, OneToMany, OneToOne,
    PrimaryGeneratedColumn, UpdateDateColumn,
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

    @Index({ unique: true })
    @Column({ nullable: false })
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Index()
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
