import {
    Entity, Column, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "@user/user.entity";

@Entity()
export class WorkspaceDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    imageUrl: string;
}

@Entity()
export class Workspace {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne((type) => WorkspaceDetails, {
        cascade: true,
    })
    @JoinColumn()
    details: WorkspaceDetails

    @ManyToMany((type) => User, (user) => user.joinedWorkspaces)
    @JoinTable()
    members: User[]

    @ManyToOne((type) => User, (user) => user.ownWorkspaces, {
        nullable: false,
    })
    owner: User;
}

export class WorkspaceWithDetails extends Workspace {
    details: WorkspaceDetails;
}
