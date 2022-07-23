import { Router } from "express";
import { getCustomerById, getCustomers, postCustomer, putCustomer } from "../controllers/CustomersController.js";
import ValidateAlterCpf from "../middlewares/ValidateAlterCpf.js";
import ValidateNewCustomerCPF from "../middlewares/ValidateNewCustomerCPF.js";
import ValidateNewCustomerData from "../middlewares/ValidateNewCustomerData.js";

const router = Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.post('/customers', ValidateNewCustomerData, ValidateNewCustomerCPF, postCustomer);
router.put('/customers/:id', ValidateNewCustomerData, ValidateAlterCpf, putCustomer);

export default router;