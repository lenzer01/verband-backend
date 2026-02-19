import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { FirstAidKit } from "../entities/firstAidKit";

const firstAidKitRepository = AppDataSource.getRepository(FirstAidKit);

/**
 * GET /firstAidKit - Alle Verbandkästen abrufen
 */
export async function firstAidKitGetAll(request: Request, response: Response) {
    try {
        const result = await firstAidKitRepository.find({
            order: { createdAt: "DESC" }
        });

        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

/**
 * GET /firstAidKit/:id - Einzelnen Verbandkästen abrufen
 */
export async function firstAidKitGet(request: Request, response: Response) {
    try {
        const idParam = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
        if (!idParam) {
            response.status(400).json({ error: "Ungueltige ID" });
            return;
        }

        const result = await firstAidKitRepository.findOne({ where: { id: idParam } });
        if (!result) {
            response.status(404).json({ error: "Verbandkästen nicht gefunden" });
            return;
        }

        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

/**
 * POST /firstAidKit - Neuen Verbandkästen erstellen (nur Admins)
 */
export async function firstAidKitCreate(request: Request, response: Response) {
    try {
        const { code, location } = request.body;
        if (!code || !location) {
            response.status(400).json({ error: "code und location sind erforderlich" });
            return;
        }

        const kit = firstAidKitRepository.create({
            code: String(code).trim(),
            location: String(location).trim()
        });

        const result = await firstAidKitRepository.save(kit);
        response.status(201).json({
            message: "Verbandkasten erfolgreich erstellt",
            firstAidKit: result
        });
    } catch (error) {
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

/**
 * PUT /firstAidKit/:id - Verbandkästen aktualisieren (nur Admins)
 */
export async function firstAidKitUpdate(request: Request, response: Response) {
    try {
        const idParam = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
        if (!idParam) {
            response.status(400).json({ error: "Ungueltige ID" });
            return;
        }

        const kit = await firstAidKitRepository.findOne({ where: { id: idParam } });
        if (!kit) {
            response.status(404).json({ error: "Verbandkästen nicht gefunden" });
            return;
        }

        const { code, location } = request.body;
        if (code !== undefined) {
            kit.code = String(code).trim();
        }

        if (location !== undefined) {
            kit.location = String(location).trim();
        }

        const result = await firstAidKitRepository.save(kit);
        response.status(200).json({
            message: "Verbandkästen erfolgreich aktualisiert",
            firstAidKit: result
        });
    } catch (error) {
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

/**
 * DELETE /firstAidKit/:id - Verbandkästen löschen (nur Admins)
 */
export async function firstAidKitDelete(request: Request, response: Response) {
    try {
        const idParam = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
        if (!idParam) {
            response.status(400).json({ error: "Ungueltige ID" });
            return;
        }

        const kit = await firstAidKitRepository.findOne({ where: { id: idParam } });
        if (!kit) {
            response.status(404).json({ error: "Verbandkasten nicht gefunden" });
            return;
        }

        await firstAidKitRepository.remove(kit);
        response.status(200).json({ message: "Verbandkasten erfolgreich gelöscht" });
    } catch (error) {
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}
