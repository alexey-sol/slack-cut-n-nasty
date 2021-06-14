import {
    Args, Mutation, Query, Resolver,
} from "@nestjs/graphql";

import { JoiValidationPipe } from "@utils/pipes";
import { UsePipes } from "@nestjs/common";
import { CreateWorkspaceDto } from "@workspace/workspace.dto";
import { WorkspaceService } from "./workspace.service";
import { createWorkspaceDtoSchema } from "./workspace.validation";

@Resolver("Workspace")
export class WorkspaceResolver {
    constructor(private workspaceService: WorkspaceService) {}

    @Query()
    workspace(@Args("id") id?: number) {
        return this.workspaceService.findWorkspaceById(id);
    }

    @Mutation()
    @UsePipes(new JoiValidationPipe(createWorkspaceDtoSchema))
    createWorkspace(@Args("input") input: CreateWorkspaceDto) {
        return this.workspaceService.createWorkspace(input);
    }
}
