import NewCustomerSchema from "../schemas/NewCustomerSchema.js";

function ValidateNewCustomerData(req, res, next) {
    const newUser = req.body;

    const validateData = NewCustomerSchema.validate(newUser);

    if(validateData.error) return res.sendStatus(422);
    
    next();
}

export default ValidateNewCustomerData;