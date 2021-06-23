import {
    Args, Mutation, Query, Resolver,
} from "@nestjs/graphql";

import { NotFoundInterceptor } from "@utils/providers/validation";
import { UseInterceptors } from "@nestjs/common";

import {
    CreateWorkspaceDto, DeleteWorkspaceArgs, FindWorkspaceArgs, FindWorkspaceMembersArgs,
} from "./workspace.dto";

import { WorkspaceService } from "./workspace.service";

@Resolver("Workspace")
export class WorkspaceResolver {
    constructor(private workspaceService: WorkspaceService) {}

    @Query()
    @UseInterceptors(NotFoundInterceptor)
    workspace(@Args() { id }: FindWorkspaceArgs) {
        return this.workspaceService.findWorkspaceById(id);
    }

    @Query()
    workspaces() {
        return this.workspaceService.findWorkspaces();
    }

    @Query()
    workspaceMembers(@Args() { workspaceId }: FindWorkspaceMembersArgs) {
        return this.workspaceService.findWorkspaceMembers(workspaceId);
    }

    @Mutation()
    createWorkspace(@Args("input") input: CreateWorkspaceDto) {
        return this.workspaceService.createWorkspace(input);
    }

    @Mutation()
    deleteWorkspace(@Args() { id }: DeleteWorkspaceArgs) {
        return this.workspaceService.deleteWorkspaceById(id);
    }
}
