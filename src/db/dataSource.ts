import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { FirstAidKit } from "../entities/firstAidKit";
import { Product } from "../entities/product";
import { KitProduct } from "../entities/kitProduct";
import { Entry } from "../entities/entry";
import { EntryItem } from "../entities/entryItem";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT ?? 5433),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//
//   entities: [User, FirstAidKit, Product, KitProduct, Entry, EntryItem],
//
//   migrations: ["src/db/migrations/*.{ts,js}"],
//
//   synchronize: true,
//   logging: false
// });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.DB_PORT ?? 5433),
  username: "dvb",
  password: "dvb",
  database: "dvb",

  entities: [User, FirstAidKit, Product, KitProduct, Entry, EntryItem],

  migrations: ["src/db/migrations/*.{ts,js}"],

  synchronize: true,
  logging: false
});
