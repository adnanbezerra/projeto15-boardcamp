import joi from 'joi';
import categoryNameSchema from '../schemas/CategoryNameSchema.js';

function validateNewCategoryName(req, res, next) {
    const name = req.body;
    const validate = categoryNameSchema.validate(name);

    if(validate.error) return res.sendStatus(422);
    next();
}

export default validateNewCategoryName;