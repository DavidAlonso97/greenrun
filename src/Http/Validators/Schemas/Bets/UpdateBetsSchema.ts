import * as Joi from 'joi';
export const updateBetsSchema = Joi.object(
    {
        body: Joi.object({
            status: Joi.string().optional(),
            odd: Joi.number().optional()
        }),
        params: Joi.object({
            id: Joi.number().required()
        }),
    }
)