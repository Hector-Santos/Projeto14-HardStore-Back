import joi from 'joi';


export const cart = joi.object({

    id: joi.required(),

    quant: joi.number().required()
})