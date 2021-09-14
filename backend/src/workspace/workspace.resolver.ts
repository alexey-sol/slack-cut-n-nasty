import {
    Args, Mutation, Query, Resolver,
} from "@nestjs/graphql";

import { NotFoundInterceptor } from "@utils/providers/validation";
import { UseFilters, UseInterceptors } from "@nestjs/common";
import { UserWithDetails } from "@root/user/user.entity";
import DeletionSuccess from "@utils/types/DeletionSuccess";
import { HttpGqlExceptionFilter } from "@root/httpExceptions/httpExceptions.filter";

import {
    CreateWorkspaceDto, FindWorkspaceArgs, FindWorkspaceMembersArgs, UpdateWorkspaceDto,
    WorkspaceIdArgs,
} from "./workspace.dto";

import { WorkspaceService } from "./workspace.service";
import { WorkspaceWithDetails } from "./workspace.entity";

@Resolver("Workspace")
@UseFilters(HttpGqlExceptionFilter)
export class WorkspaceResolver {
    constructor(private workspaceService: WorkspaceService) {}

    @Query()
    @UseInterceptors(NotFoundInterceptor)
    workspace(
        @Args() { id }: FindWorkspaceArgs,
    ): Promise<WorkspaceWithDetails> {
        return this.workspaceService.findWorkspaceById(id);
    }

    @Query()
    workspaces() {
        return this.workspaceService.findWorkspaces();
    }

    @Query()
    workspaceMembers(
        @Args() { workspaceId }: FindWorkspaceMembersArgs,
    ): Promise<UserWithDetails[]> {
        return this.workspaceService.findWorkspaceMembers(workspaceId);
    }

    @Mutation()
    createWorkspace(
        @Args("input") input: CreateWorkspaceDto,
    ): Promise<WorkspaceWithDetails> {
        return this.workspaceService.createWorkspace(input);
    }

    @Mutation()
    updateWorkspace(
        @Args() { id }: WorkspaceIdArgs,
        @Args("input") input: UpdateWorkspaceDto,
    ): Promise<WorkspaceWithDetails> {
        return this.workspaceService.updateWorkspace(id, input);
    }

    @Mutation()
    deleteWorkspace(
        @Args() { id }: WorkspaceIdArgs,
    ): Promise<DeletionSuccess> {
        return this.workspaceService.deleteWorkspaceById(id);
    }
}
