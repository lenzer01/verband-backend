import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FirstAidKit } from "./firstAidKit";
import { User } from "./user";

export interface MaterialItem {
  type: string;
  quantity: number;
}

@Entity({ name: "entries" })
export class Entry {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Beinhaltet Raumnummer
  @ManyToOne(() => FirstAidKit, { nullable: false, onDelete: "RESTRICT" })
  @Index()
  kit!: FirstAidKit;

  @ManyToOne(() => User, { nullable: false, onDelete: "RESTRICT" })
  @Index()
  createdBy!: User;

  // Zeitpunkt des Vorfalls (nicht nur "wann gespeichert")
  @Column({ type: "timestamptz" })
  occurredAt!: Date;

  // Unfallart
  @Column({ type: "text" })
  incident!: string;

  @Column({type: "text"})
  firstAider!: string;

  // Hergang
  @Column({ type: "text" })
  description!: string;

  // Maßnahmen
  @Column({ type: "text", nullable: true })
  measures?: string | null;

  // Materialliste als JSON
  @Column({ type: "jsonb", default: [] })
  materialList!: MaterialItem[];

  // Nachricht an den Gesundheitsbeauftragten
  @Column({ type: "text", nullable: true })
  message?: string | null;

  // Zeuge
  @Column({ type: "text", nullable: true })
  witness?: string | null;
}
