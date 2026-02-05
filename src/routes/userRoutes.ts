import {Router} from "express"
import { user_create } from "../controller/userController";

export const user_router = Router()

user_router.get("/create", user_create);