import joiBase from "joi"

export const customerSchema = joi.object({ 
    name: joi.string().trim().required(),
    phone: joi.string().trim().length(11).pattern(/^\d+$/).required(),
    cpf: joi.string().trim().length(11).pattern(/^\d+$/).required(),
    birthday: joi.date().format(['YYYY-MM-DD']).required()
})