import { Router } from "express";
import { createGames, getGames } from "../controllers/games.controllers.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { gameSchema } from "../schemas/games.schemas.js";
import { validateCreateGame } from "../middlewares/games.middleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateSchema(gameSchema), validateCreateGame, createGames);

export default gamesRouter;