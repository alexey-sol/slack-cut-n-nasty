import {
    IsDefined, IsEmail, IsInt, IsNotEmptyObject, IsString, IsNotEmpty, IsOptional, IsUrl,
    MaxLength, MinLength, Validate, ValidateNested,
} from "class-validator";

import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { UserExists } from "@utils/providers/validation";

class CreateDetailsDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    displayName?: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    fullName!: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    @MaxLength(200)
    imageUrl?: string;
}

export class CreateUserDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email!: string;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateDetailsDto)
    details!: CreateDetailsDto;
}

class UpdateDetailsDto extends PartialType(CreateDetailsDto) {}

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ["details"] as const),
) {
    @ValidateNested()
    @Type(() => UpdateDetailsDto)
    details?: UpdateDetailsDto;
}

export class UserIdArgs {
    @IsDefined()
    @IsInt()
    @Validate(UserExists)
    id!: number;
}

export class FindUserArgs {
    @IsOptional()
    @IsInt()
    id?: number;

    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string;
}
