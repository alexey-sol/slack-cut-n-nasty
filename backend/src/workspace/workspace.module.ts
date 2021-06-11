import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Workspace } from "./workspace.entity";
import { WorkspaceResolver } from "./workspace.resolver";
import { WorkspaceService } from "./workspace.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Workspace]),
    ],
    providers: [WorkspaceService, WorkspaceResolver],
    exports: [TypeOrmModule],
})

export class WorkspaceModule {}
