import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserExists } from "@utils/providers/validation";
import { UserRepository } from "../user/user.repository";
import { WorkspaceDetails } from "../workspaceDetails/workspaceDetails.entity";
import { WorkspaceRepository } from "./workspace.repository";
import { WorkspaceResolver } from "./workspace.resolver";
import { WorkspaceService } from "./workspace.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([WorkspaceRepository, WorkspaceDetails, UserRepository]),
    ],
    providers: [WorkspaceService, WorkspaceResolver, UserExists],
    exports: [TypeOrmModule],
})

export class WorkspaceModule {}
