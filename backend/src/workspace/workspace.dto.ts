import {
    IsInt, IsString, IsNotEmpty, IsOptional, IsUrl, MaxLength, MinLength, Validate,
} from "class-validator";

import { PartialType } from "@nestjs/mapped-types";
import { UserExists } from "@utils/providers/validation";

export class CreateWorkspaceDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(200)
    description?: string;

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

    @IsInt()
    @Validate(UserExists)
    ownerId: number;
}

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {}
