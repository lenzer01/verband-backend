import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum UserRole {
  REPORTER = "REPORTER",     // Einträge erstellen, eigene sehen
  LEADERSHIP = "LEADERSHIP", // alle Einträge sehen
  ADMIN = "ADMIN"            // Bestände / Nachfüllbedarf verwalten
}

@Entity({ name: "users" })
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  email!: string;

  // Passwort niemals im Klartext speichern!
  @Column({ type: "varchar", length: 255 })
  passwordHash!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.REPORTER })
  role!: UserRole;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
