import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

const relations = [
    "details", "joinedWorkspaces", "joinedWorkspaces.details", "ownWorkspaces",
    "ownWorkspaces.details",
];

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findById(id: number) {
        return this.findOne(id, { relations });
    }

    findByEmail(email: string) {
        return this.findOne({ email }, { relations });
    }

    findAll() {
        return this.find({ relations });
    }

    async deleteById(id: number) {
        await this.delete(id);
        return { id };
    }
}
