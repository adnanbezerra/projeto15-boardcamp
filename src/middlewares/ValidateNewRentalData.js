import NewRentalSchema from "../schemas/NewRentalSchema.js";

function ValidateNewRentalData(req, res, next) {
    const newRental = req.body;

    const validation = NewRentalSchema.validate(newRental);
    if(validation.error) return res.sendStatus(422);

    next()
}

export default ValidateNewRentalData;