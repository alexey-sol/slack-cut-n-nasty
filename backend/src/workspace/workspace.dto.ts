import { PartialType } from "@nestjs/mapped-types";

export class CreateWorkspaceDto {
    description?: string;
    name: string;
    imageUrl?: string;
    ownerId: number;
}

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {}
