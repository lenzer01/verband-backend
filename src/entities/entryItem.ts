import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entry } from "./entry";
import { Product } from "./product";

@Entity({ name: "entry_items" })
export class EntryItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Entry, { nullable: false, onDelete: "CASCADE" })
  @Index()
  entry!: Entry;

  @ManyToOne(() => Product, { nullable: false, onDelete: "RESTRICT" })
  @Index()
  product!: Product;

  @Column({ type: "int" })
  qty!: number;
}
