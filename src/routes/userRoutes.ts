import { Router } from "express";
import { user_get, user_get_all, user_delete } from "../controller/userController";
import { authenticate, adminOnly } from "../middleware/authMiddleware";

export const user_router = Router();


// GET /user - Alle Benutzer abrufen (nur Admins)
user_router.get("/", authenticate, adminOnly, user_get_all);

// GET /user/:id - Einzelnen Benutzer abrufen (Admins oder eigener User)
user_router.get("/:id", authenticate, user_get);

// DELETE /user/:id - Benutzer löschen (nur Admins)
user_router.delete("/:id", authenticate, adminOnly, user_delete);
