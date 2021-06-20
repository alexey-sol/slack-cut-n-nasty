import { EntityRepository, Repository } from "typeorm";
import CustomRepository from "@utils/types/CustomRepository";
import { Workspace } from "./workspace.entity";

const relations = ["details", "members", "members.details", "owner", "owner.details"];

@EntityRepository(Workspace)
export class WorkspaceRepository extends Repository<Workspace> implements CustomRepository<
    Workspace
> {
    findById(id: number) {
        return this.findOne(id, { relations });
    }
}
