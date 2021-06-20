import {
    IsDefined, IsEmail, IsInt, IsString, IsNotEmpty, IsOptional, IsUrl, MaxLength, MinLength,
    Validate,
} from "class-validator";

import { PartialType } from "@nestjs/mapped-types";
import { UserExists } from "@utils/providers/validation";

export class CreateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    displayName?: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    fullName: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    @MaxLength(200)
    imageUrl?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FindUserArgs {
    @IsOptional()
    @IsInt()
    @Validate(UserExists)
    id: number;

    @IsOptional()
    @IsString()
    @IsEmail()
    @Validate(UserExists)
    email: string;
}
