import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Product } from "../entities/product";

const productRepository = AppDataSource.getRepository(Product);

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isValidUUID(id: string): boolean {
    return UUID_REGEX.test(id);
}

/**
 * GET /product
 * Alle Produkte abrufen
 */
export async function productGetAll(request: Request, response: Response) {
    try {
        if (!request.user?.userId) {
            response.status(401).json({ error: "Authentifizierung erforderlich" });
            return;
        }

        const result = await productRepository.find({
            order: { type: "ASC" }
        });

        response.status(200).json(result);
    } catch (error) {
        console.error("productGetAll error:", error);
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

/**
 * GET /product/:id
 * Einzelnes Produkt abrufen
 */
export async function productGet(request: Request, response: Response) {
    try {
        if (!request.user?.userId) {
            response.status(401).json({ error: "Authentifizierung erforderlich" });
            return;
        }

        const productId = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
        if (!productId) {
            response.status(400).json({ error: "Ungültige ID" });
            return;
        }

        const result = await productRepository.findOne({ where: { id: productId } });
        if (!result) {
            response.status(404).json({ error: "Produkt nicht gefunden" });
            return;
        }

        response.status(200).json(result);
    } catch (error) {
        console.error("productGet error:", error);
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

/**
 * POST /product
 * Neues Produkt erstellen (nur Admins)
 */
export async function productCreate(request: Request, response: Response) {
    try {
        if (!request.user?.userId) {
            response.status(401).json({ error: "Authentifizierung erforderlich" });
            return;
        }

        const { type } = request.body;
        if (!type) {
            response.status(400).json({ error: "type ist erforderlich" });
            return;
        }

        const product = productRepository.create({
            type: String(type).trim()
        });

        const result = await productRepository.save(product);
        response.status(201).json({
            message: "Produkt erfolgreich erstellt",
            product: result
        });
    } catch (error: any) {
        if (error?.code === "23505") {
            response.status(409).json({ error: "Ein Produkt mit diesem Typ existiert bereits" });
            return;
        }
        console.error("productCreate error:", error);
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

/**
 * PUT /product/:id
 * Produkt aktualisieren (nur Admins)
 */
export async function productUpdate(request: Request, response: Response) {
    try {
        if (!request.user?.userId) {
            response.status(401).json({ error: "Authentifizierung erforderlich" });
            return;
        }

        const productId = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
        if (!productId || !isValidUUID(productId)) {
            response.status(400).json({ error: "Ungültige ID" });
            return;
        }

        const product = await productRepository.findOne({ where: { id: productId } });
        if (!product) {
            response.status(404).json({ error: "Produkt nicht gefunden" });
            return;
        }

        const { type } = request.body;
        if (type !== undefined) {
            const trimmedType = String(type).trim();
            if (!trimmedType) {
                response.status(400).json({ error: "type darf nicht leer sein" });
                return;
            }
            product.type = trimmedType;
        }

        const result = await productRepository.save(product);
        response.status(200).json({
            message: "Produkt erfolgreich aktualisiert",
            product: result
        });
    } catch (error: any) {
        if (error?.code === "23505") {
            response.status(409).json({ error: "Ein Produkt mit diesem Typ existiert bereits" });
            return;
        }
        console.error("productUpdate error:", error);
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

/**
 * DELETE /product/:id
 * Produkt löschen (nur Admins)
 */
export async function productDelete(request: Request, response: Response) {
    try {
        if (!request.user?.userId) {
            response.status(401).json({ error: "Authentifizierung erforderlich" });
            return;
        }

        const productId = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
        if (!productId || !isValidUUID(productId)) {
            response.status(400).json({ error: "Ungültige ID" });
            return;
        }

        const product = await productRepository.findOne({ where: { id: productId } });
        if (!product) {
            response.status(404).json({ error: "Produkt nicht gefunden" });
            return;
        }

        await productRepository.remove(product);
        response.status(200).json({ message: "Produkt erfolgreich gelöscht" });
    } catch (error) {
        console.error("productDelete error:", error);
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}




