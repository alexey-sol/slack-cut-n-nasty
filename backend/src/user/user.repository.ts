import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

const relations = ["details"];

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findById(id: number) {
        return this.findOne(id, { relations });
    }

    findByEmail(email: string) {
        return this.findOne(null, {
            where: { email },
            relations: ["details"],
        });
    }
}
