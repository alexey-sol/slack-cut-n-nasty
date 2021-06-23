import {
    IsDefined, IsInt, IsString, IsNotEmpty, IsOptional, IsUrl, MaxLength, MinLength, Validate,
} from "class-validator";

import { PartialType } from "@nestjs/mapped-types";
import { UserExists, WorkspaceExists } from "@utils/providers/validation";

export class CreateWorkspaceDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(200)
    description?: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    @MaxLength(200)
    imageUrl?: string;

    @IsDefined()
    @IsInt()
    @Validate(UserExists)
    ownerId: number;
}

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {}

export class FindWorkspaceArgs {
    @IsDefined()
    @IsInt()
    id: number;
}

export class FindWorkspaceMembersArgs {
    @IsDefined()
    @IsInt()
    @Validate(WorkspaceExists)
    workspaceId: number;
}

export class DeleteWorkspaceArgs {
    @IsDefined()
    @IsInt()
    @Validate(WorkspaceExists)
    id: number;
}
