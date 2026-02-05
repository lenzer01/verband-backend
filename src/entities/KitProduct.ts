import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { FirstAidKit } from "./FirstAidKit";
import { Product } from "./Product";

@Entity({ name: "kit_products" })
@Unique(["kit", "product"])
export class KitProduct {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => FirstAidKit, { nullable: false, onDelete: "CASCADE" })
  @Index()
  kit!: FirstAidKit;

  @ManyToOne(() => Product, { nullable: false, onDelete: "CASCADE" })
  @Index()
  product!: Product;

  @Column({ type: "int", default: 0 })
  targetQty!: number;

  @Column({ type: "int", default: 0 })
  currentQty!: number;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
