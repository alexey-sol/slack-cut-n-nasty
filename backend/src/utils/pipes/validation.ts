import {
    ArgumentMetadata, BadRequestException, Injectable, PipeTransform,
} from "@nestjs/common";

import { ObjectSchema } from "joi";
import { ObjectType, getConnection } from "typeorm";
import { NotFoundInRepository } from "@utils/exceptions/http";
import CustomRepository from "@utils/types/CustomRepository";

@Injectable()
export class SchemaValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}

    transform(value: unknown, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);

        if (error) {
            throw new BadRequestException(error);
        }

        return value;
    }
}

@Injectable()
export class DataValidationPipe implements PipeTransform {
    constructor(
        private idFieldToFindWith = "id",
        private RepositoryToInspect: ObjectType<unknown>,
    ) {}

    async transform(value: unknown, metadata: ArgumentMetadata) {
        const connection = getConnection();
        const id = value[this.idFieldToFindWith];
        const repo = connection.getCustomRepository<CustomRepository>(this.RepositoryToInspect);
        const record = await repo.findById(id);
        // TODO: can I attach the record to req in order to access it down the pipeline without
        // the need finding it again?

        if (!record) {
            throw new NotFoundInRepository(this.RepositoryToInspect.name);
        }

        return value;
    }
}
