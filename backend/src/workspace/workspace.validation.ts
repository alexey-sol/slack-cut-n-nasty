import * as Joi from "joi";

export const createWorkspaceDtoSchema = Joi.object({
    name: Joi.string().min(2).max(50)
        .required(),
});
