import { Router } from "express";
import { sanitizeVehicleInput, findAll, findOne, add, update, remove, addVehicleToUser, obtenerVehiculosConGarage, } from "./vehicles.controler.js";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware.js";
export const characterRouter = Router();
characterRouter.get("/", authMiddleware, roleMiddleware(["Admin"]), findAll);
characterRouter.post("/", sanitizeVehicleInput, authMiddleware, roleMiddleware(["Admin"]), add);
characterRouter.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), remove);
characterRouter.get("/:id", authMiddleware, roleMiddleware(["Cliente", "Dueño", "Admin"]), findOne);
characterRouter.put("/:id", sanitizeVehicleInput, authMiddleware, roleMiddleware(["Cliente", "Dueño", "Admin"]), update);
characterRouter.patch("/:id", sanitizeVehicleInput, authMiddleware, roleMiddleware(["Cliente", "Dueño", "Admin"]), update);
characterRouter.post("/:userId/vehicles", authMiddleware, roleMiddleware(["Cliente", "Dueño", "Admin"]), addVehicleToUser);
characterRouter.get("/vehiculos/:usuarioId", authMiddleware, roleMiddleware(["Cliente", "Dueño", "Admin"]), obtenerVehiculosConGarage);
//# sourceMappingURL=vehicles.routes.js.map