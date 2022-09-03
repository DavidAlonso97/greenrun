import * as Joi from 'joi';
export const createUsersSchema = Joi.object({
    role: Joi.string().alphanum().required(),
    first_name: Joi.string().alphanum().required(),
    last_name: Joi.string().alphanum().required(),
    phone: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().required(),
    password: Joi.string().alphanum().required(),
    address: Joi.string().alphanum().required(),
    gender: Joi.string().alphanum().required(),
    birth_date: Joi.string().alphanum().required(),
    country_id: Joi.number().required(),
    city: Joi.string().alphanum().required(),
    category: Joi.string().alphanum().required(),
    document_id: Joi.number().required(),
    user_state: Joi.string().alphanum().required(),
})