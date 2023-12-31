import { Router } from "express"
import { getCustomers, getCustomerById, createCustomer, updateCustomer } from "../controllers/customers.controllers.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { customerSchema } from "../schemas/customers.schemas.js"
import { validateCustomerCpf } from "../middlewares/customers.middleware.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getCustomerById)
customersRouter.post("/customers", validateSchema(customerSchema), validateCustomerCpf, createCustomer)
customersRouter.put("/customers/:id", validateSchema(customerSchema),validateCustomerCpf,  updateCustomer)

export default customersRouter