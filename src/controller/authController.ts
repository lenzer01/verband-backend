import { Request, Response } from "express";
import * as userService from "../service/userService";
import { UserRole } from "../entities/user";

/**
 * POST /auth/register
 * Registriert einen neuen Benutzer (nur Admins)
 */
export async function authRegister(req: Request, res: Response): Promise<void> {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ error: "Name, Email und Passwort sind erforderlich" });
            return;
        }

        const userRole = role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.REPORTER;

        const user = await userService.createUser(name, email, password, userRole);

        const { passwordHash, ...userWithoutPassword } = user;
        res.status(201).json({
            message: "Registrierung erfolgreich",
            user: userWithoutPassword
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Interner Serverfehler" });
        }
    }
}

/**
 * POST /auth/login
 * Authentifiziert einen Benutzer mit Email und Passwort
 */
export async function authLogin(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Email und Passwort sind erforderlich" });
            return;
        }

        const result = await userService.login(email, password);

        res.status(200).json({
            message: "Login erfolgreich",
            user: result.user,
            token: result.token
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Interner Serverfehler" });
        }
    }
}

