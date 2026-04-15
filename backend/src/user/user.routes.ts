import { Router } from "express";
import {
  sanitizeUserInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  create,
  login,
  findVehiclesByUser,
  addVehicleToUser,
  activateUser,
} from "./user.controler.js";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware.js";

export const UserRouter = Router();

UserRouter.post("/login", login);
UserRouter.post("/register", sanitizeUserInput, create);

UserRouter.get(
  "/:usuarioId/vehiculos",
  authMiddleware,
  roleMiddleware(["Cliente", "Dueño", "Admin"]),
  findVehiclesByUser
);
UserRouter.post(
  "/addVehicleToUser",
  authMiddleware,
  roleMiddleware(["Cliente", "Dueño", "Admin"]),
  addVehicleToUser
);

UserRouter.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["Cliente", "Dueño", "Admin"]),
  findOne
);
UserRouter.put(
  "/:id",
  sanitizeUserInput,
  authMiddleware,
  roleMiddleware(["Cliente", "Dueño", "Admin"]),
  update
);
UserRouter.patch(
  "/:id",
  sanitizeUserInput,
  authMiddleware,
  roleMiddleware(["Cliente", "Dueño", "Admin"]),
  update
);

UserRouter.get("/", authMiddleware, roleMiddleware(["Admin"]), findAll);
UserRouter.post("/", sanitizeUserInput, authMiddleware, roleMiddleware(["Admin"]), add);
UserRouter.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), remove);

UserRouter.put("/admin/:id/activar", authMiddleware, roleMiddleware(["Admin"]), activateUser);
UserRouter.put(
  "/admin/:id/desactivar",
  sanitizeUserInput,
  authMiddleware,
  roleMiddleware(["Admin"]),
  remove
);