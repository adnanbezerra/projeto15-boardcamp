import joi from 'joi';

const cpfPattern = /[0-9]{11}/;
const phonePattern = /[0-9]{10,11}/;

const NewCustomerSchema = joi.object({
    cpf: joi.string().regex(cpfPattern).required(),
    phone: joi.string().regex(phonePattern).required(),
    birthday: joi.date().required(),
    name: joi.string().required()
})

export default NewCustomerSchema;