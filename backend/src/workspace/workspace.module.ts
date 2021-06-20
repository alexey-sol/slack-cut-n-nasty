import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "@user/user.repository";
import { UserExists, WorkspaceExists } from "@utils/providers/validation";
import { WorkspaceDetails } from "./workspace.entity";
import { WorkspaceRepository } from "./workspace.repository";
import { WorkspaceResolver } from "./workspace.resolver";
import { WorkspaceService } from "./workspace.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([WorkspaceRepository, WorkspaceDetails, UserRepository]),
    ],
    providers: [WorkspaceService, WorkspaceResolver, UserExists, WorkspaceExists],
    exports: [TypeOrmModule],
})

export class WorkspaceModule {}
