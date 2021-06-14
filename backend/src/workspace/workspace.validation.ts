import * as Joi from "joi";

export const createWorkspaceDtoSchema = Joi.object({
    description: Joi.string().optional(),
    imageUrl: Joi.string().uri({
        scheme: [/^https?$/],
    }).optional(),
    name: Joi.string().min(2).max(50)
        .required(),
    ownerId: Joi.number().integer().required(),
});
