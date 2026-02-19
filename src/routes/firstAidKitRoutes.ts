import { Router } from "express";
import {
    firstAidKitCreate,
    firstAidKitDelete,
    firstAidKitGet,
    firstAidKitGetAll,
    firstAidKitUpdate
} from "../controller/firstAidKitController";
import { adminOnly, authenticate } from "../middleware/authMiddleware";

export const firstAidKitRouter = Router();

// GET /first-aid-kit - Alle Verbandkaesten abrufen
firstAidKitRouter.get("/", authenticate, firstAidKitGetAll);

// GET /first-aid-kit/:id - Einzelnen Verbandkasten abrufen
firstAidKitRouter.get("/:id", authenticate, firstAidKitGet);

// POST /first-aid-kit - Neuen Verbandkasten erstellen (nur Admins)
firstAidKitRouter.post("/", authenticate, adminOnly, firstAidKitCreate);

// PUT /first-aid-kit/:id - Verbandkasten aktualisieren (nur Admins)
firstAidKitRouter.put("/:id", authenticate, adminOnly, firstAidKitUpdate);

// DELETE /first-aid-kit/:id - Verbandkasten loeschen (nur Admins)
firstAidKitRouter.delete("/:id", authenticate, adminOnly, firstAidKitDelete);
