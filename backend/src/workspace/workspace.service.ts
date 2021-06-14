import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WorkspaceRepository } from "@workspace/workspace.repository";
import { UserRepository } from "@user/user.repository";
import { NotFoundException as UserNotFoundException } from "@user/user.exception";
import { CreateWorkspaceDto } from "./workspace.dto";
import { WorkspaceDetails, WorkspaceWithDetails } from "./workspace.entity";

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

    async createWorkspace({
        description, imageUrl, name, ownerId,
    }: CreateWorkspaceDto): Promise<WorkspaceWithDetails> {
        const owner = await this.userRepository.findById(ownerId);

        if (!owner) { // todo: check it when validating
            throw new UserNotFoundException();
        }

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
}
