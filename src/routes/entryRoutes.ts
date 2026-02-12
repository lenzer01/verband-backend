import { Router } from "express";
import { entryCreate, entryDelete, entryGet, entryGetAll, entryUpdate } from "../controller/entryController";
import { authenticate } from "../middleware/authMiddleware";

export const entryRouter = Router();

// POST /entry - Neuen Eintrag erstellen
entryRouter.post("/", authenticate, entryCreate);

// GET /entry - Einträge abrufen (Admins alle, Reporter eigene)
entryRouter.get("/", authenticate, entryGetAll);

// GET /entry/:id - Einzelnen Eintrag abrufen
entryRouter.get("/:id", authenticate, entryGet);

// PUT /entry/:id - Eintrag aktualisieren
entryRouter.put("/:id", authenticate, entryUpdate);

// DELETE /entry/:id - Eintrag löschen
entryRouter.delete("/:id", authenticate, entryDelete);
