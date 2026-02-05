import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { AppDataSource } from "../db/dataSource";
import { User, UserRole } from "../entities/user";

const userRepository = AppDataSource.getRepository(User);

const emailSchema = z.string().email("Ungültige E-Mail-Adresse");

// Password Validation (min 8 Zeichen, mindestens 1 Großbuchstabe, 1 Kleinbuchstabe, 1 Zahl)
const passwordSchema = z
    .string()
    .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
    .regex(/[A-Z]/, "Passwort muss mindestens einen Großbuchstaben enthalten")
    .regex(/[a-z]/, "Passwort muss mindestens einen Kleinbuchstaben enthalten")
    .regex(/[0-9]/, "Passwort muss mindestens eine Zahl enthalten");

const SALT_ROUNDS = 10;
const JWT_SECRET = "jwtSecretKey"; // TODO: bitte bedenken, der soll in irgendeine art von environment variable
const JWT_EXPIRES_IN = "24h";

export interface AuthPayload {
    userId: number;
    email: string;
    role: UserRole;
}

export interface LoginResult {
    user: Omit<User, "passwordHash">;
    token: string;
}

export async function createUser(
    name: string,
    email: string,
    password: string,
    admin: boolean
): Promise<User> {
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
        throw new Error(emailResult.error.issues[0].message);
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
        throw new Error(passwordResult.error.issues[0].message);
    }

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
        throw new Error("Ein Benutzer mit dieser E-Mail-Adresse existiert bereits");
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = userRepository.create({
        name,
        email,
        passwordHash,
        role: admin ? UserRole.ADMIN : UserRole.REPORTER
    });

    return await userRepository.save(user);
}

export async function getUser(id?: number): Promise<User | User[] | null> {
    if (id) {
        return await userRepository.findOne({ where: { id } });
    }
    return await userRepository.find();
}

export async function deleteUser(id: number): Promise<boolean> {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
        return false;
    }
    await userRepository.remove(user);
    return true;
}

export async function login(email: string, password: string): Promise<LoginResult> {
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
        throw new Error(emailResult.error.issues[0].message);
    }

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
        throw new Error("Ungültige E-Mail-Adresse oder Passwort");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        throw new Error("Ungültige E-Mail-Adresse oder Passwort");
    }

    const payload: AuthPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

    const { passwordHash, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        token
    };
}

export function verifyToken(token: string): AuthPayload {
    try {
        return jwt.verify(token, JWT_SECRET) as AuthPayload;
    } catch (error) {
        throw new Error("Ungültiges oder abgelaufenes Token");
    }
}
