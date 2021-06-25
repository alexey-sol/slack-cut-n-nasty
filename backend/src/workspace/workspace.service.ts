import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import DeletionSuccess from "@utils/types/DeletionSuccess";
import { CreateWorkspaceDto, UpdateWorkspaceDto } from "./workspace.dto";
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

    async createWorkspace(
        { details, ownerId }: CreateWorkspaceDto,
    ): Promise<WorkspaceWithDetails> {
        const { description, imageUrl, name } = details;
        const owner = await this.userRepository.findById(ownerId);

        const detailsEntity = this.detailsRepository.create();
        detailsEntity.name = name;
        detailsEntity.description = description;
        detailsEntity.imageUrl = imageUrl;

        const workspace = this.workspaceRepository.create();
        workspace.details = detailsEntity;
        workspace.owner = owner;
        workspace.members = [owner];

        owner.joinedWorkspaces.push(workspace);
        owner.ownWorkspaces.push(workspace);
        await this.userRepository.save(owner);

        return this.workspaceRepository.save(workspace);
    }

    async updateWorkspace(id: number, {
        details, ...restForWorkspace
    }: UpdateWorkspaceDto): Promise<WorkspaceWithDetails> {
        const workspace = await this.findWorkspaceById(id);

        Object.entries(restForWorkspace).forEach((entry) => {
            const [key, value] = entry;
            workspace[key] = value;
        });

        workspace.details = { ...workspace.details, ...details };
        return this.workspaceRepository.save(workspace);
    }

    deleteWorkspaceById(id: number): Promise<DeletionSuccess> {
        return this.workspaceRepository.deleteById(id);
    }
}
