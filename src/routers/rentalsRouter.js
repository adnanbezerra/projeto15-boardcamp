import { Router } from "express";
import { deleteRental, getRentals, postRental, returnRental } from "../controllers/RentalsController.js";
import ValidateRentalId from "../middlewares/ValidateRentalId.js";
import ValidateRentalReturned from "../middlewares/ValidateRentalReturned.js";
import ValidateNewRentalData from "../middlewares/ValidateNewRentalData.js";
import ValidateCustomerId from "../middlewares/ValidateCustomerId.js";
import ValidateGameId from "../middlewares/ValidadeGameId.js";
import ValidateGameAvailability from "../middlewares/ValidateGameAvailability.js";

const router = Router();

router.get('/rentals', getRentals);
router.post('/rentals', ValidateNewRentalData, ValidateCustomerId, ValidateGameId, ValidateGameAvailability, postRental);
router.post('/rentals/:id/return', ValidateRentalId, ValidateRentalReturned, returnRental);
router.delete('/rentals/:id', ValidateRentalId, ValidateRentalReturned, deleteRental);

export default router;