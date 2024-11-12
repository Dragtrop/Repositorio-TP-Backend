import express from "express";
import cors from "cors";
import { characterRouter } from "./vehicles/vehicles.routes.js";
import { characterRouterVehicleTypes } from "./vehicleTypes/vehicleTypes.routes.js";
import { GarageRouter } from "./garage/garage.routes.js";
import { UserRouter } from "./user/user.routes.js";
import { serviceRouter } from "./service/service.routes.js";
import { AlquilerRouter } from "./alquiler/alquiler.routes.js";
const app = express();
app.use(cors());
app.use(cors());
app.use(express.json());
app.use('/api/vehicles', characterRouter);
app.use('/api/vehicleTypes', characterRouterVehicleTypes);
app.use('/api/alquileres', AlquilerRouter);
app.use('/api/garages', GarageRouter);
app.use('/api/login', UserRouter);
app.use('/api/services', serviceRouter);
app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});
//# sourceMappingURL=app.js.map