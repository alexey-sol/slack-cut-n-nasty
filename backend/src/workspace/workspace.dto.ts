import {
    IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength, Validate,
    IsNotEmptyObject, ValidateNested,
} from "class-validator";

import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { UserExists, WorkspaceExists } from "@utils/providers/validation";

class CreateDetailsDto {
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
    name!: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    @MaxLength(200)
    imageUrl?: string;
}

export class CreateWorkspaceDto {
    @IsDefined()
    @IsInt()
    @Validate(UserExists)
    ownerId!: number;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateDetailsDto)
    details!: CreateDetailsDto;
}

class UpdateDetailsDto extends PartialType(CreateDetailsDto) {}

export class UpdateWorkspaceDto extends PartialType(
    OmitType(CreateWorkspaceDto, ["details"] as const),
) {
    @ValidateNested()
    @Type(() => UpdateDetailsDto)
    details?: UpdateDetailsDto;
}

export class FindWorkspaceArgs {
    @IsDefined()
    @IsInt()
    id!: number;
}

export class WorkspaceIdArgs {
    @IsDefined()
    @IsInt()
    @Validate(WorkspaceExists)
    id!: number;
}

export class FindWorkspaceMembersArgs {
    @IsDefined()
    @IsInt()
    @Validate(WorkspaceExists)
    workspaceId!: number;
}
