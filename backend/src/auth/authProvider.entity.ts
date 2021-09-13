import {
    Column, Entity, Index, PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class AuthProvider {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column({ nullable: false })
    provider: string;
}
