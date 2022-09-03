import * as Joi from 'joi';
export const getBetsSchema = Joi.object().keys({
    event_id: Joi.number().optional(),
    sport: Joi.string().alphanum().optional()
})