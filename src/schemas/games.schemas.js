import joiBase from "joi"

export const customerSchema = joi.object({ 
    name: joi.string().trim().required(),
    image: joi.string().uri().trim().required(),
    stockTotal: joi.number().integer().min(1).required(),
    pricePerDay: joi.number().integer().min(1).required()
})