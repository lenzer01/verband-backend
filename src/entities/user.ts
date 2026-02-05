import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  REPORTER = "REPORTER",     // Einträge erstellen, eigene sehen
  ADMIN = "ADMIN"            // Bestände / Nachfüllbedarf verwalten
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  passwordHash!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.REPORTER })
  role!: UserRole;
}
