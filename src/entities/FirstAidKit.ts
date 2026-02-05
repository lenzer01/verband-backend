import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "first_aid_kits" })
@Unique(["code"])
export class FirstAidKit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Das ist der Wert, der später im QR-Code steckt (z.B. "KASTEN-001")
  @Column({ type: "varchar", length: 64 })
  code!: string;

  @Column({ type: "varchar", length: 255 })
  location!: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
