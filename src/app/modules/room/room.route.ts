import { Router } from "express";
import { RoomControllers } from "./room.controller";
import validateRequest from "../../middlewares/validateRequest";
import { roomValidations } from "./room.validation";

const router = Router();

router.post("/",
validateRequest(roomValidations.createRoomValidationSchema),
 RoomControllers.createRoom);
router.get("/", RoomControllers.getAllRooms);
router.get("/:id", RoomControllers.getRoomById);

export const RoomRoutes = router;