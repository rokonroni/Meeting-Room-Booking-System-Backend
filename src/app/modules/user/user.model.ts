import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser>({
    name: {
        type: String, 
        required: true, 
    },
    email: {
        type: String, 
        required: true,
        unique: true,  
    },
    phone: {
        type:String, 
        required: true, 
        unique: true, 
    },
    password: {
        type: String, 
        required: true, 
    },
    address: {
        type: String, 
        required: true, 
    },
    role: {
        type: String,
        default: "user",
        enum: ["user","admin"]
    },
}, 
{
    timestamps:true
})

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; 

  
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});


const User= model<TUser>("User", userSchema);
export default User; 