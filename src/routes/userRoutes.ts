import { Router } from "express";
import { userGet, userGetAll, userDelete } from "../controller/userController";
import { authenticate, adminOnly } from "../middleware/authMiddleware";

export const userRouter = Router();


// GET /user - Alle Benutzer abrufen (nur Admins)
userRouter.get("/", authenticate, adminOnly, userGetAll);

// GET /user/:id - Einzelnen Benutzer abrufen (Admins oder eigener User)
userRouter.get("/:id", authenticate, userGet);

// DELETE /user/:id - Benutzer löschen (nur Admins)
userRouter.delete("/:id", authenticate, adminOnly, userDelete);
