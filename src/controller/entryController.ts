import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Entry } from "../entities/entry";
import { FirstAidKit } from "../entities/firstAidKit";
import { UserRole } from "../entities/user";

const entryRepository = AppDataSource.getRepository(Entry);
const firstAidKitRepository = AppDataSource.getRepository(FirstAidKit);

/**
 * POST /entry
 * Erstellt einen neuen Eintrag
 */
export async function entryCreate(request: Request, response: Response) {
    try {
        if (!request.user?.userId) {
            response.status(401).json({ error: "Authentifizierung erforderlich" });
            return;
        }

        const { kitId, occurredAt, incident, description, firstAider, measures, materialList, usedMaterial, witness } = request.body;

        if (!kitId || !occurredAt || !description || !firstAider || !materialList || !usedMaterial) {
            response.status(400).json({ error: "kitId, occurredAt, description, firstAider, materialList und usedMaterial sind erforderlich" });
            return;
        }

        const kit = await firstAidKitRepository.findOne({ where: { id: kitId } });
        if (!kit) {
            response.status(404).json({ error: "Verbandkasten nicht gefunden" });
            return;
        }

        const occurredAtDate = new Date(occurredAt);
        if (isNaN(occurredAtDate.getTime())) {
            response.status(400).json({ error: "Ungültiges Datum für occurredAt" });
            return;
        }

        const entry = entryRepository.create({
            kit,
            createdBy: { id: request.user.userId },
            occurredAt: occurredAtDate,
            incident: String(incident).trim(),
            description: String(description).trim(),
            firstAider: String(firstAider).trim(),
            measures: measures ? String(measures).trim() : null,
            materialList: String(materialList).trim(),
            usedMaterial: String(usedMaterial).trim(),
            witness: witness? String(witness).trim() : null
        });

        const savedEntry = await entryRepository.save(entry);
        const result = await entryRepository.findOne({
            where: { id: savedEntry.id },
            relations: { kit: true, createdBy: true }
        });

        response.status(201).json({
            message: "Eintrag erfolgreich erstellt",
            entry: result
        });
    } catch (error) {
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

/**
 * GET /entry
 * Ruft Einträge ab (Admin: alle, Reporter: nur eigene)
 */
export async function entryGetAll(request: Request, response: Response) {
    try {
        if (!request.user?.userId || !request.user.role) {
            response.status(401).json({ error: "Authentifizierung erforderlich" });
            return;
        }

        const result =
            request.user.role === UserRole.ADMIN
                ? await entryRepository.find({
                      relations: { kit: true, createdBy: true },
                      order: { occurredAt: "DESC" }
                  })
                : await entryRepository.find({
                      where: { createdBy: { id: request.user.userId } },
                      relations: { kit: true, createdBy: true },
                      order: { occurredAt: "DESC" }
                  });

        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

/**
 * GET /entry/:id
 * Ruft einen Eintrag per ID ab
 */
export async function entryGet(request: Request, response: Response) {
    try {
        if (!request.user?.userId || !request.user.role) {
            response.status(401).json({ error: "Authentifizierung erforderlich" });
            return;
        }

        const entryId = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
        if (!entryId) {
            response.status(400).json({ error: "Ungültige ID" });
            return;
        }

        const result = await entryRepository.findOne({
            where: { id: entryId },
            relations: { kit: true, createdBy: true }
        });

        if (!result) {
            response.status(404).json({ error: "Eintrag nicht gefunden" });
            return;
        }

        if (request.user.role !== UserRole.ADMIN && result.createdBy.id !== request.user.userId) {
            response.status(403).json({ error: "Keine Berechtigung für diese Aktion" });
            return;
        }

        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

/**
 * PUT /entry/:id
 * Aktualisiert einen Eintrag
 */
export async function entryUpdate(request: Request, response: Response) {
    try {
        if (!request.user?.userId || !request.user.role) {
            response.status(401).json({ error: "Authentifizierung erforderlich" });
            return;
        }

        const entryId = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
        if (!entryId) {
            response.status(400).json({ error: "Ungültige ID" });
            return;
        }

        const entry = await entryRepository.findOne({
            where: { id: entryId },
            relations: { kit: true, createdBy: true }
        });

        if (!entry) {
            response.status(404).json({ error: "Eintrag nicht gefunden" });
            return;
        }

        if (request.user.role !== UserRole.ADMIN && entry.createdBy.id !== request.user.userId) {
            response.status(403).json({ error: "Keine Berechtigung für diese Aktion" });
            return;
        }

        const { kitId, occurredAt, description, measures } = request.body;
        if (kitId !== undefined) {
            const kit = await firstAidKitRepository.findOne({ where: { id: kitId } });
            if (!kit) {
                response.status(404).json({ error: "Verbandkasten nicht gefunden" });
                return;
            }
            entry.kit = kit;
        }

        if (occurredAt !== undefined) {
            const occurredAtDate = new Date(occurredAt);
            if (isNaN(occurredAtDate.getTime())) {
                response.status(400).json({ error: "Ungültiges Datum für occurredAt" });
                return;
            }
            entry.occurredAt = occurredAtDate;
        }

        if (description !== undefined) {
            const value = String(description).trim();
            if (!value) {
                response.status(400).json({ error: "description darf nicht leer sein" });
                return;
            }
            entry.description = value;
        }

        if (measures !== undefined) {
            entry.measures = measures === null ? null : String(measures).trim();
        }

        const result = await entryRepository.save(entry);

        response.status(200).json({
            message: "Eintrag erfolgreich aktualisiert",
            entry: result
        });
    } catch (error) {
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

/**
 * DELETE /entry/:id
 * Löscht einen Eintrag
 */
export async function entryDelete(request: Request, response: Response) {
    try {
        if (!request.user?.userId || !request.user.role) {
            response.status(401).json({ error: "Authentifizierung erforderlich" });
            return;
        }

        const entryId = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
        if (!entryId) {
            response.status(400).json({ error: "Ungültige ID" });
            return;
        }

        const entry = await entryRepository.findOne({
            where: { id: entryId },
            relations: { createdBy: true }
        });

        if (!entry) {
            response.status(404).json({ error: "Eintrag nicht gefunden" });
            return;
        }

        if (request.user.role !== UserRole.ADMIN && entry.createdBy.id !== request.user.userId) {
            response.status(403).json({ error: "Keine Berechtigung für diese Aktion" });
            return;
        }

        await entryRepository.remove(entry);
        response.status(200).json({ message: "Eintrag erfolgreich gelöscht" });
    } catch (error) {
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}
