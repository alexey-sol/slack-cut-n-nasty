import { EntityRepository, Repository } from "typeorm";
import { Workspace } from "./workspace.entity";

const relations = ["details", "members", "owner"];

@EntityRepository(Workspace)
export class WorkspaceRepository extends Repository<Workspace> {
    findById(id: number) {
        return this.findOne(id, { relations });
    }
}
