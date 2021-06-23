import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWorkspaceDto } from "./workspace.dto";
import { UserRepository } from "../user/user.repository";
import { UserWithDetails } from "../user/user.entity";
import { WorkspaceDetails } from "../workspaceDetails/workspaceDetails.entity";
import { WorkspaceRepository } from "./workspace.repository";
import { WorkspaceWithDetails } from "./workspace.entity";

@Injectable()
export class WorkspaceService {
    constructor(
        private workspaceRepository: WorkspaceRepository,

        @InjectRepository(WorkspaceDetails)
        private detailsRepository: Repository<WorkspaceDetails>,

        private userRepository: UserRepository,
    ) {}

    findWorkspaceById(id: number): Promise<WorkspaceWithDetails> {
        return this.workspaceRepository.findById(id);
    }

    findWorkspaces(): Promise<WorkspaceWithDetails[]> {
        return this.workspaceRepository.findAll();
    }

    async findWorkspaceMembers(workspaceId): Promise<UserWithDetails[]> {
        const workspace = await this.workspaceRepository.findById(workspaceId);
        return workspace.members;
    }

    async createWorkspace({
        description, imageUrl, name, ownerId,
    }: CreateWorkspaceDto): Promise<WorkspaceWithDetails> {
        const owner = await this.userRepository.findById(ownerId);

        const details = this.detailsRepository.create();
        details.name = name;
        details.description = description;
        details.imageUrl = imageUrl;

        const workspace = this.workspaceRepository.create();
        workspace.details = details;
        workspace.owner = owner;
        workspace.members = [owner];

        owner.joinedWorkspaces.push(workspace);
        owner.ownWorkspaces.push(workspace);
        await this.userRepository.save(owner);

        return this.workspaceRepository.save(workspace);
    }

    deleteWorkspaceById(id: number): Promise<{ id: number }> {
        return this.workspaceRepository.deleteById(id);
    }
}
