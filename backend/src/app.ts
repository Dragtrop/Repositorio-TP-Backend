import express from "express";
import { characterRouter } from "./vehicles/vehicles.routes.js";
import { characterRouterVehicleTypes } from "./vehicleTypes/vehicleTypes.routes.js";
<<<<<<< HEAD
import { locationRouter } from "./location/location.routes.js";

const app = express();

app.use(express.json());
=======
import cors from "cors";

const app = express();

>>>>>>> 43085175e656e160ac0bccecf34c619bfd77413a

app.use('/api/vehicles', characterRouter);
app.use('/api/vehicleTypes', characterRouterVehicleTypes);
app.use('/api/locations', locationRouter);

<<<<<<< HEAD
app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});
=======
app.use(cors());

app.use('/vehicles',characterRouter)
app.use('/api/vehicleTypes',characterRouterVehicleTypes)

app.use((_,res)=>{
   return res.status(404).send({message:'Resource not found'})
})

app.listen(3000,() => {
    console.log("Server running on  http://localhost:3000/")
})
>>>>>>> 43085175e656e160ac0bccecf34c619bfd77413a
