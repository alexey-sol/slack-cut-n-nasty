import {
    IsDefined, IsEmail, IsInt, IsString, IsNotEmpty, IsOptional, IsUrl, MaxLength, MinLength,
} from "class-validator";

import { PartialType } from "@nestjs/mapped-types";

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
    id: number;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;
}
