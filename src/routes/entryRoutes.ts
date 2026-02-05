import { Router } from "express";
import { entryCreate, entryGetAll, entryGetData } from "../controller/entryController";

export const entryRouter = Router();

entryRouter.get("/create", entryCreate);
entryRouter.get("/getData", entryGetData);
entryRouter.get("/getAll", entryGetAll);