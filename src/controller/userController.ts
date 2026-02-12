import { Request, Response } from "express";
import * as userService from "../service/userService";
import { UserRole } from "../entities/user";


/**
 * GET /user - Alle Benutzer abrufen (nur Admins)
 */
export async function userGetAll(request: Request, response: Response) {
    try {
        const result = await userService.getUser();

        if (Array.isArray(result)) {
            const usersWithoutPassword = result.map(({ passwordHash, ...user }) => user);
            response.status(200).json(usersWithoutPassword);
        }
    } catch (error) {
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

/**
 * GET /user/:id - Einzelnen Benutzer abrufen
 * Normale User können nur sich selbst sehen, Admins alle
 */
export async function userGet(request: Request, response: Response) {
    try {
        const idParam = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
        const id = idParam ? parseInt(idParam, 10) : undefined;

        if (!id || isNaN(id) || id <= 0) {
            response.status(400).json({ error: "Ungültige ID" });
            return;
        }

        // Prüfe ob User sich selbst abfragt oder Admin ist
        if (request.user?.role !== UserRole.ADMIN && request.user?.userId !== id) {
            response.status(403).json({ error: "Keine Berechtigung für diese Aktion" });
            return;
        }

        const result = await userService.getUser(id);

        if (!result || Array.isArray(result)) {
            response.status(404).json({ error: "Benutzer nicht gefunden" });
            return;
        }

        const { passwordHash, ...userWithoutPassword } = result;
        response.status(200).json(userWithoutPassword);
    } catch (error) {
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}

export async function userDelete(request: Request, response: Response) {
    try {
        const idParam = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
        const id = idParam ? parseInt(idParam, 10) : undefined;

        if (!id || isNaN(id) || id <= 0) {
            response.status(400).json({ error: "Gültige ID ist erforderlich" });
            return;
        }

        const deleted = await userService.deleteUser(id);

        if (!deleted) {
            response.status(404).json({ error: "Benutzer nicht gefunden" });
            return;
        }

        response.status(200).json({ message: "Benutzer erfolgreich gelöscht" });
    } catch (error) {
        response.status(500).json({ error: "Interner Serverfehler" });
    }
}