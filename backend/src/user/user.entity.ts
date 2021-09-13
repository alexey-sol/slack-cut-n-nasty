import {
    Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,
} from "typeorm";

import { Date } from "@utils/db/entities";
import { AuthProvider } from "@root/auth/authProvider.entity";
import { Workspace } from "@root/workspace/workspace.entity";
import { UserDetails } from "@root/userDetails/userDetails.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column({ nullable: false })
    email: string;

    @Column((type) => Date)
    date: Date;

    @OneToOne((type) => UserDetails, (details) => details.user, {
        cascade: true,
    })
    details: UserDetails;

    @ManyToMany((type) => Workspace, (workspace) => workspace.members, {
        nullable: false, onDelete: "CASCADE",
    })
    joinedWorkspaces: Workspace[];

    @OneToMany((type) => Workspace, (workspace) => workspace.owner, {
        nullable: false,
    })
    ownWorkspaces: Workspace[];

    @ManyToOne((type) => AuthProvider, null, {
        nullable: false,
    })
    provider: AuthProvider;
}

export class UserWithDetails extends User {
    details: UserDetails;
}
