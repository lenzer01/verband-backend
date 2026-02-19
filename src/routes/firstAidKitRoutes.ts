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

// GET /firstAidKit - Alle Verbandkaesten abrufen
firstAidKitRouter.get("/", authenticate, firstAidKitGetAll);

// GET /firstAidKit/:id - Einzelnen Verbandkasten abrufen
firstAidKitRouter.get("/:id", authenticate, firstAidKitGet);

// POST /firstAidKit - Neuen Verbandkasten erstellen (nur Admins)
firstAidKitRouter.post("/", authenticate, adminOnly, firstAidKitCreate);

// PUT /firstAidKit/:id - Verbandkasten aktualisieren (nur Admins)
firstAidKitRouter.put("/:id", authenticate, adminOnly, firstAidKitUpdate);

// DELETE /firstAidKit/:id - Verbandkasten loeschen (nur Admins)
firstAidKitRouter.delete("/:id", authenticate, adminOnly, firstAidKitDelete);
