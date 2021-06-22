import {
    Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from "typeorm";

import { Workspace } from "../workspace/workspace.entity";

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

    @Index()
    @OneToOne((type) => Workspace, {
        nullable: false, onDelete: "CASCADE",
    })
    @JoinColumn({ name: "workspaceId" })
    workspace: Workspace
}
