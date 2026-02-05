import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { FirstAidKit } from "../entities/FirstAidKit";
import { Product } from "../entities/Product";
import { KitProduct } from "../entities/KitProduct";
import { Entry } from "../entities/Entry";
import { EntryItem } from "../entities/EntryItem";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  entities: [User, FirstAidKit, Product, KitProduct, Entry, EntryItem],

  migrations: ["src/db/migrations/*.{ts,js}"],

  synchronize: false,
  logging: false
});
