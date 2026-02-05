import {NextFunction, Request, Response} from "express";
import {AuthPayload, verifyToken} from "../service/userService";
import {UserRole} from "../entities/user";

// Erweitert Express Request um user Property
declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}

/**
 * Middleware zur Authentifizierung via JWT Token
 * Erwartet Header: Authorization: Bearer <token>
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Authentifizierung erforderlich" });
        return;
    }

    const token = authHeader.substring(7); // "Bearer " entfernen

    try {
        req.user = verifyToken(token);
        next();
    } catch (error) {
        res.status(401).json({ error: "Ungültiges oder abgelaufenes Token" });
    }
}

/**
 * Middleware zur Autorisierung - prüft ob User eine bestimmte Rolle hat
 */
export function authorize(...allowedRoles: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ error: "Authentifizierung erforderlich" });
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({ error: "Keine Berechtigung für diese Aktion" });
            return;
        }

        next();
    };
}

/**
 * Middleware die nur Admins erlaubt
 */
export const adminOnly = authorize(UserRole.ADMIN);
