import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Workspace } from "./workspace.entity";

@Injectable()
export class WorkspaceService {
    constructor(
        @InjectRepository(Workspace)
        private workspaceRepository: Repository<Workspace>,
    ) {}

    findAll(filter): Promise<Workspace[]> {
        return this.workspaceRepository.find(filter);
    }

    findOne(id: number): Promise<Workspace> {
        return this.workspaceRepository.findOne(id);
    }
}
