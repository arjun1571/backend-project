import { Router } from "express";
import { userControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validationRequest } from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/register",
  validationRequest(createUserZodSchema),

  userControllers.createUser
);
router.get("/all-users", userControllers.getAllUsers);

export const userRoutes = router;
