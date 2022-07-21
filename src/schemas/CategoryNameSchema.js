import joi from 'joi';

const categoryNameSchema = joi.object({
    name: joi.string().trim().required()
});

export default categoryNameSchema;