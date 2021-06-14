import * as Joi from "joi";

export const createUserDtoSchema = Joi.object({
    displayName: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email({
        minDomainSegments: 2,
    }),
    fullName: Joi.string().min(2).max(50).required(),
    imageUrl: Joi.string().uri({
        scheme: [/^https?$/],
    }).optional(),
});
