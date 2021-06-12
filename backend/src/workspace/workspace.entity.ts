import {
    Entity, Column, JoinTable, ManyToMany, PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "@user/user.entity";

@Entity()
export class Workspace {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => User)
    @JoinTable()
    users: User[]
}

export class CreateWorkspaceDto {
    name: string;
}
