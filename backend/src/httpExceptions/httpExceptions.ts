import * as common from "@nestjs/common";
import { codes } from "@root/httpExceptions/httpExceptions.const";

export class TargetAlreadyExistsException extends common.ConflictException {
    constructor(targetName: string) {
        super({
            name: codes.ALREADY_EXISTS,
            message: `${targetName} Already Exists`,
            targetName,
        });
    }
}

export class TargetNotFoundException extends common.NotFoundException {
    constructor(targetName: string) {
        super({
            name: codes.NOT_FOUND,
            message: `${targetName} Not Found`,
            targetName,
        });
    }
}
