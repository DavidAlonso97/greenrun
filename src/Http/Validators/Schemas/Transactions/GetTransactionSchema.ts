import * as Joi from 'joi';
export const getTransactionSchema = Joi.object({
    user_id: Joi.number().required(),
    category: Joi.string().alphanum().required()
})