import { Schema, Types, model } from "mongoose";
import { TSlot } from "./slot.interface";
import Room from "../room/room.model";

const SlotSchema: Schema = new Schema({
  room: { 
    type: Types.ObjectId, 
    ref: Room,
    required: true
    },
  date: { 
    type: Date, 
    required: true 
    },
  startTime: { 
    type: String, 
    required: true 
    },
  endTime: { 
    type: String, 
    required: true 
    },
  isBooked: { 
    type: Boolean, 
    required: true 
    },
});

const Slot = model<TSlot>("slot", SlotSchema);

export default Slot;