import * as common from "@nestjs/common";
import * as exceptions from "./httpExceptions";
import { codes, keys } from "./httpExceptions.const";

export interface ExceptionInfo {
    code: string;
    isValidationError?: boolean;
    targetName: string;
}

export function createExceptionMessage(
    { code, isValidationError = false, targetName }: ExceptionInfo,
) {
    const validationHint = (isValidationError)
        ? `/${keys.VALIDATION}`
        : "";

    return `${targetName}/${code}${validationHint}`;
}

export function parseExceptionMessage(message: string) {
    const splitMessage = message.split("/");

    return {
        targetName: splitMessage[0],
        code: splitMessage[1],
        isValidationError: Boolean(splitMessage[2]),
    };
}

export function getAppropriateException(exceptionMessage: string) {
    const { code, isValidationError, targetName } = parseExceptionMessage(exceptionMessage);

    switch (code) {
        case codes.ALREADY_EXISTS:
            return new exceptions.TargetAlreadyExistsException(targetName);
        case codes.NOT_FOUND:
            return new exceptions.TargetNotFoundException(targetName);
        default:
            return (isValidationError)
                ? new common.BadRequestException()
                : new common.InternalServerErrorException();
    }
}
