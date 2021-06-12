import { FindManyOptions, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateWorkspaceDto, Workspace } from "./workspace.entity";

@Injectable()
export class WorkspaceService {
    constructor(
        @InjectRepository(Workspace)
        private workspaceRepository: Repository<Workspace>,
    ) {}

    findManyWorkspaces(options: FindManyOptions): Promise<Workspace[]> {
        return this.workspaceRepository.find(options);
    }

    findOneWorkspace(id: number): Promise<Workspace> {
        return this.workspaceRepository.findOne(id);
    }

    createWorkspace(input: CreateWorkspaceDto): Promise<Workspace> {
        const workspace = this.workspaceRepository.create(input);
        return this.workspaceRepository.save(workspace);
    }
}
