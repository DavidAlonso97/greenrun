import * as Joi from 'joi';
export const placeBetsSchema = Joi.object(
    {
        bet_option: Joi.string()
            .alphanum()
            .required(),
        sport: Joi.string()
            .alphanum()
            .required(),
        status: Joi.string()
            .alphanum()
            .required(),
        name: Joi.string()
            .alphanum()
            .required(),
        event_id: Joi.number()
            .required(),
        odd: Joi.number()
            .required(),
        result: Joi.string()
            .alphanum()
            .required(),
    }
)