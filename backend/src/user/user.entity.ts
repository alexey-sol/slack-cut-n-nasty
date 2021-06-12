import {
    Entity, Column, JoinTable, PrimaryGeneratedColumn, ManyToMany,
} from "typeorm";

import { Workspace } from "../workspace/workspace.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Workspace)
    @JoinTable()
    workspaces: Workspace[]
}

export class CreateUserDto {
    name: string;
}
