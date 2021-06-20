import { NotFoundException } from "@nestjs/common";
import codes from "@utils/const/exceptionCodes";

export class NotFoundInRepository extends NotFoundException {
    constructor(repositoryName: string) {
        super({
            name: codes.NOT_FOUND,
            message: `Not Found In ${repositoryName}`,
            origin: repositoryName,
        });
    }
}
