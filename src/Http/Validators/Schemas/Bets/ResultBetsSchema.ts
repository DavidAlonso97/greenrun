import * as Joi from 'joi';
export const resultBetsSchema = Joi.object(
    {
        body: Joi.object({
            result: Joi.string().required()
        }),
        params: Joi.object({
            id: Joi.number().required()
        }),
    }
)