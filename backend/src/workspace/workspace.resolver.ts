import {
    Args, Mutation, Query, Resolver,
} from "@nestjs/graphql";

import { CreateWorkspaceDto } from "@workspace/workspace.dto";
import { WorkspaceService } from "./workspace.service";

@Resolver("Workspace")
export class WorkspaceResolver {
    constructor(private workspaceService: WorkspaceService) {}

    @Query()
    workspace(@Args("id") id: number) {
        return this.workspaceService.findWorkspaceById(id);
    }

    @Mutation()
    createWorkspace(@Args("input") input: CreateWorkspaceDto) {
        return this.workspaceService.createWorkspace(input);
    }
}
