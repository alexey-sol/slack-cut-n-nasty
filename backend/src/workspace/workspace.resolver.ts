import {
    Args, Mutation, Query, Resolver,
} from "@nestjs/graphql";

import { CreateWorkspaceDto } from "./workspace.entity";
import { WorkspaceService } from "./workspace.service";

@Resolver("Workspace")
export class WorkspaceResolver {
    constructor(private workspaceService: WorkspaceService) {}

    @Query()
    async getWorkspace(@Args("id") id: number) {
        return this.workspaceService.findOneWorkspace(id);
    }

    @Mutation()
    async createWorkspace(@Args("input") input: CreateWorkspaceDto) {
        return this.workspaceService.createWorkspace(input);
    }
}
