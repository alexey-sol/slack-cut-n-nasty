import { PartialType } from "@nestjs/mapped-types";

export class CreateUserDto {
    displayName?: string;
    email: string;
    fullName: string;
    imageUrl?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
