import { EntityRepository, Repository } from "typeorm";
import CustomRepository from "@utils/types/CustomRepository";
import { User } from "./user.entity";

const relations = [
    "details", "joinedWorkspaces", "joinedWorkspaces.details", "ownWorkspaces",
    "ownWorkspaces.details",
];

@EntityRepository(User)
export class UserRepository extends Repository<User> implements CustomRepository<User> {
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
