import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Date {
    @CreateDateColumn()
    create: Date;

    @UpdateDateColumn()
    update: Date;
}
