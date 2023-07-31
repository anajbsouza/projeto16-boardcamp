import { Router } from "express"
import { createCustomer, getCustomerById, getCustomers, updateCustomer } from "../controllers/customers.cotrollers.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { customerSchema } from "../schemas/customers.schemas.js"
import { validateCustomerCpf, validateGetCustomer } from "../middlewares/customers.middleware.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", validateGetCustomer, getCustomerById)
customersRouter.post("/customers", validateSchema(customerSchema), validateCustomerCpf, createCustomer)
customersRouter.put("/customers/:id", validateSchema(customerSchema),validateCustomerCpf,  updateCustomer)

export default customersRouter