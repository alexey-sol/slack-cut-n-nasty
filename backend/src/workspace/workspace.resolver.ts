import { Args, Query, Resolver } from "@nestjs/graphql";
import { WorkspaceService } from "./workspace.service";

@Resolver("Workspace")
export class WorkspaceResolver {
    constructor(private workspaceService: WorkspaceService) {}

    @Query()
    async getWorkspace(@Args("id") id: number) {
        return this.workspaceService.findOne(id);
    }
}
