import {
    CallHandler, ExecutionContext, Injectable, NestInterceptor,
} from "@nestjs/common";

import {
    ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface,
} from "class-validator";

import { Repository } from "typeorm";
import { Observable } from "rxjs";
import { TargetNotFound } from "@utils/exceptions/http";
import { tap } from "rxjs/operators";
import { WorkspaceRepository } from "@root/workspace/workspace.repository";
import { UserRepository } from "@root/user/user.repository";
import providers from "@const/providers";
import { Text } from "@utils/wrappers/Text";

abstract class RecordExists implements ValidatorConstraintInterface {
    protected constructor(protected repository: Repository<unknown>) {}

    async validate(id: number, args: ValidationArguments) {
        const record = await this.repository.findOne(id);

        if (record === undefined) {
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

@ValidatorConstraint({ name: "IsValidProvider" })
@Injectable()
export class IsValidProvider implements ValidatorConstraintInterface {
    validate(provider: string) {
        const providerToCheck = new Text(provider).normalize();

        const knownProviders = Object
            .values(providers)
            .map((knownProvider) => new Text(knownProvider).normalize());

        const isValidProvider = knownProviders.includes(providerToCheck);

        if (!isValidProvider) {
            throw new TargetNotFound(`AuthProvider "${provider}"`);
        }

        return true;
    }
}

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(tap((data) => {
                if (data === undefined) {
                    const targetName = context.getArgByIndex(3).returnType;
                    throw new TargetNotFound(targetName);
                }
            }));
    }
}
