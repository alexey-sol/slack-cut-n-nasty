import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "@user/user.repository";
import { WorkspaceDetails } from "./workspace.entity";
import { WorkspaceRepository } from "./workspace.repository";
import { WorkspaceResolver } from "./workspace.resolver";
import { WorkspaceService } from "./workspace.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([WorkspaceRepository, WorkspaceDetails, UserRepository]),
    ],
    providers: [WorkspaceService, WorkspaceResolver],
    exports: [TypeOrmModule],
})

export class WorkspaceModule {}
