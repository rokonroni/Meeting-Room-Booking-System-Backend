import { Schema, model } from "mongoose";
import { TRoom } from "./room.interface";

const RoomSchema = new Schema<TRoom>({
  name: { 
    type: String, 
    required: true 
    },
  roomNo: { 
    type: Number, 
    required: true , 
    unique: true, 
    },
  floorNo: { 
    type: Number, 
    required: true 
    },
  capacity: { 
    type: Number,
    required: true 
    },
  pricePerSlot: { 
    type: Number, 
    required: true 
    },
  amenities: { 
    type: [String], 
    required: true 
    },
  isDeleted: { 
    type: Boolean, 
    default: false 
    },
});

const Room = model<TRoom>("room", RoomSchema);

export default Room;