import joi from 'joi';

const GameDataSchema = joi.object({
    name: joi.string().trim().required()
})

export default GameDataSchema;