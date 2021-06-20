import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TargetNotFound } from "@utils/exceptions/http";
import { UserRepository } from "@user/user.repository";
import { WorkspaceRepository } from "@workspace/workspace.repository";

import {
    ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface,
} from "class-validator";

abstract class RecordExists implements ValidatorConstraintInterface {
    protected constructor(protected repository: Repository<unknown>) {}

    async validate(value: unknown, args: ValidationArguments) {
        const { property } = args;
        const isId = typeof value === "number" && property === "id";

        const record = await this.repository.findOne((isId)
            ? value
            : { [property]: value });

        if (!record) {
            const { targetName } = this.repository.metadata;
            throw new TargetNotFound(targetName);
        }

        return true;
    }
}

@ValidatorConstraint({ name: "UserExists", async: true })
@Injectable()
export class UserExists extends RecordExists {
    constructor(repository: UserRepository) {
        super(repository);
    }
}

@ValidatorConstraint({ name: "WorkspaceExists", async: true })
@Injectable()
export class WorkspaceExists extends RecordExists {
    constructor(repository: WorkspaceRepository) {
        super(repository);
    }
}
