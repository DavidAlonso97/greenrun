import * as Joi from 'joi';
import { TRANSACCIONS_CATEGORIES } from '../../../../Domain/Interfaces/TransactionCategories';
export const getTransactionSchema = Joi.object({
    user_id: Joi.number().required(),
    category: Joi
        .string()
        .alphanum()
        .allow(
            TRANSACCIONS_CATEGORIES.BET,
            TRANSACCIONS_CATEGORIES.DEPOSIT,
            TRANSACCIONS_CATEGORIES.WINNING,
            TRANSACCIONS_CATEGORIES.WITHDRAW
        )
        .only()
        .required()
})