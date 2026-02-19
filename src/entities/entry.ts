import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FirstAidKit } from "./firstAidKit";
import { User } from "./user";

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

  // Zeuge
  @Column({ type: "text", nullable: true })
  measures?: string | null;

  // Materialliste
  @Column({type: "text"})
  materialList!: string;

  // Entnommenes Material
  @Column({type: "text"})
  usedMaterial!: string;

  // Zeuge
  @Column({ type: "text", nullable: true })
  witness?: string | null;
}
