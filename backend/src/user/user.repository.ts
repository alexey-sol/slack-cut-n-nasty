import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

const relations = ["details", "joinedWorkspaces", "ownWorkspaces"];

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findById(id: number) {
        return this.findOne(id, { relations });
    }

    findByEmail(email: string) {
        return this.findOne(null, {
            where: { email },
            relations,
        });
    }
}
