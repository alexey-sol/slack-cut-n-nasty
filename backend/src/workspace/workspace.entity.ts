import {
    Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn,
} from "typeorm";

import { Date } from "@utils/db/entities";
import { User } from "../user/user.entity";
import { WorkspaceDetails } from "../workspaceDetails/workspaceDetails.entity";

@Entity()
export class Workspace {
    @PrimaryGeneratedColumn()
    id: number;

    @Column((type) => Date)
    date: Date;

    @OneToOne((type) => WorkspaceDetails, (details) => details.workspace, {
        cascade: true,
    })
    details: WorkspaceDetails;

    @ManyToMany((type) => User, (user) => user.joinedWorkspaces, {
        nullable: false,
    })
    @JoinTable()
    members: User[]

    @Index()
    @ManyToOne((type) => User, (user) => user.ownWorkspaces, {
        nullable: false, onDelete: "CASCADE",
    })
    owner: User;
}

export class WorkspaceWithDetails extends Workspace {
    details: WorkspaceDetails;
}
