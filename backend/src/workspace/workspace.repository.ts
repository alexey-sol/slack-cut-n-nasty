import { EntityRepository, Repository } from "typeorm";
import { Workspace } from "./workspace.entity";

const relations = ["details", "members", "members.details", "owner", "owner.details"];

@EntityRepository(Workspace)
export class WorkspaceRepository extends Repository<Workspace> {
    findById(id: number) {
        return this.findOne(id, { relations });
    }

    findAll() {
        return this.find({ relations });
    }

    async deleteById(id: number) {
        await this.delete(id);
        return { id };
    }
}
