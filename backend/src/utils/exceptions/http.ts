import { NotFoundException } from "@nestjs/common";
import codes from "@utils/const/exceptionCodes";

export class TargetNotFound extends NotFoundException {
    constructor(targetName: string) {
        super({
            name: codes.NOT_FOUND,
            message: `${targetName} Not Found`,
            targetName,
        });
    }
}
