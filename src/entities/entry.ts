import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FirstAidKit } from "./firstAidKit";
import { User } from "./user";

@Entity({ name: "entries" })
export class Entry {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => FirstAidKit, { nullable: false, onDelete: "RESTRICT" })
  @Index()
  kit!: FirstAidKit;

  @ManyToOne(() => User, { nullable: false, onDelete: "RESTRICT" })
  @Index()
  createdBy!: User;

  // Zeitpunkt des Vorfalls (nicht nur "wann gespeichert")
  @Column({ type: "timestamptz" })
  occurredAt!: Date;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text", nullable: true })
  measures?: string | null;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
