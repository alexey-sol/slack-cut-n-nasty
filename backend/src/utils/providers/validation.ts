import {
    CallHandler, ExecutionContext, Injectable, NestInterceptor,
} from "@nestjs/common";

import {
    ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface,
} from "class-validator";

import { Repository } from "typeorm";
import { Observable } from "rxjs";
import * as exceptions from "@root/httpExceptions/httpExceptions";
import { tap } from "rxjs/operators";
import { WorkspaceRepository } from "@root/workspace/workspace.repository";
import { UserRepository } from "@root/user/user.repository";
import providers from "@const/providers";
import { Text } from "@utils/wrappers/Text";
import { codes } from "@root/httpExceptions/httpExceptions.const";
import { createExceptionMessage } from "@root/httpExceptions/httpExceptions.utils";

abstract class RecordShouldExist implements ValidatorConstraintInterface {
    protected constructor(protected repository: Repository<unknown>) {}

    async validate(id: number, args: ValidationArguments) {
        const record = await this.repository.findOne(id);
        return record !== undefined;
    }

    defaultMessage(args: ValidationArguments) {
        return createExceptionMessage({
            code: codes.NOT_FOUND,
            isValidationError: true,
            targetName: this.repository.metadata.targetName,
        });
    }
}

@ValidatorConstraint({ name: "UserShouldExist", async: true })
@Injectable()
export class UserShouldExist extends RecordShouldExist {
    constructor(repository: UserRepository) {
        super(repository);
    }
}

@ValidatorConstraint({ name: "WorkspaceShouldExist", async: true })
@Injectable()
export class WorkspaceShouldExist extends RecordShouldExist {
    constructor(repository: WorkspaceRepository) {
        super(repository);
    }
}

@ValidatorConstraint({ name: "UserAlreadyExists", async: true })
@Injectable()
export class UserAlreadyExists implements ValidatorConstraintInterface {
    constructor(protected repository: UserRepository) {}

    async validate(email: string, args: ValidationArguments) {
        const record = await this.repository.findByEmail(email);
        return record === undefined;
    }

    defaultMessage(args: ValidationArguments) {
        return createExceptionMessage({
            code: codes.ALREADY_EXISTS,
            isValidationError: true,
            targetName: this.repository.metadata.targetName,
        });
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

        return knownProviders.includes(providerToCheck);
    }

    defaultMessage(args: ValidationArguments) {
        return createExceptionMessage({
            code: codes.NOT_FOUND,
            isValidationError: true,
            targetName: "AuthProvider",
        });
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
                    throw new exceptions.TargetNotFoundException(targetName);
                }
            }));
    }
}
