import {
    Args, Mutation, Query, Resolver,
} from "@nestjs/graphql";

import { UsePipes } from "@nestjs/common";
import { CreateWorkspaceDto } from "./workspace.entity";
import { JoiValidationPipe } from "@utils/pipes";
import { WorkspaceService } from "./workspace.service";
import { createWorkspaceDtoSchema } from "./workspace.validation";

@Resolver("Workspace")
export class WorkspaceResolver {
    constructor(private workspaceService: WorkspaceService) {}

    @Query()
    async getWorkspace(@Args("id") id: number) {
        return this.workspaceService.findOneWorkspace(id);
    }

    @Mutation()
    @UsePipes(new JoiValidationPipe(createWorkspaceDtoSchema))
    async createWorkspace(@Args("input") input: CreateWorkspaceDto) {
        return this.workspaceService.createWorkspace(input);
    }
}
