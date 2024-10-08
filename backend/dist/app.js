import express from "express";
import { characterRouter } from "./vehicles/vehicles.routes.js";
import { characterRouterVehicleTypes } from "./vehicleTypes/vehicleTypes.routes.js";
import { locationRouter } from "./location/location.routes.js";
import { GarageRouter } from "./garage/garage.routes.js";
import cors from "cors";
import { UserRouter } from "./user/user.routes.js";
import { serviceRouter } from "./service/service.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use('/vehicles', characterRouter);
app.use('/vehicleTypes', characterRouterVehicleTypes);
app.use('/locations', locationRouter);
app.use('/garages', GarageRouter);
app.use('/users', UserRouter);
app.use('/services', serviceRouter);
app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});
app.listen(3000, () => {
    console.log("Server running on  http://localhost:3000/");
});
//# sourceMappingURL=app.js.map