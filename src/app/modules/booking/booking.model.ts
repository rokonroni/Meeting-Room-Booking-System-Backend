import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';
import { timeStamp } from 'console';

const bookingSchema = new Schema<TBooking>({
  room: { 
    type: Schema.Types.ObjectId, 
    ref: 'Room', 
    required: true 
    },
  slots: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Slot', 
    required: true 
    }],
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
    },
  date: { 
    type: Date, 
    required: true 
    },
  totalAmount: { 
    type: Number, 
    required: true 
    },
  isConfirmed: {
    type: String,
    enum: ['unconfirmed', 'confirmed', 'canceled'],
    default: 'unconfirmed',
  },
  isDeleted: { 
    type: Boolean, 
    default: false },
},
{
  timestamps: true
}
);

export const Booking = model<TBooking>('Booking', bookingSchema);