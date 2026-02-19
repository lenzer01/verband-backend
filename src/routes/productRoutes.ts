import { Router } from "express";
import {
    productCreate,
    productDelete,
    productGet,
    productGetAll,
    productUpdate
} from "../controller/productController";
import { adminOnly, authenticate } from "../middleware/authMiddleware";

export const productRouter = Router();

// GET /product - Alle Produkte abrufen (alle authentifizierten User)
productRouter.get("/", authenticate, productGetAll);

// GET /product/:id - Einzelnes Produkt abrufen (alle authentifizierten User)
productRouter.get("/:id", authenticate, productGet);

// POST /product - Neues Produkt erstellen (nur Admins)
productRouter.post("/", authenticate, adminOnly, productCreate);

// PUT /product/:id - Produkt aktualisieren (nur Admins)
productRouter.put("/:id", authenticate, adminOnly, productUpdate);

// DELETE /product/:id - Produkt löschen (nur Admins)
productRouter.delete("/:id", authenticate, adminOnly, productDelete);

