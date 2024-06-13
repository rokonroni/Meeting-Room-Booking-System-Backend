import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<IUser, UserModel>({
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
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// set '' after saving password
// userSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
//   passwordChangedTimestamp: Date,
//   jwtIssuedTimestamp: number,
// ) {
//   const passwordChangedTime =
//     new Date(passwordChangedTimestamp).getTime() / 1000;
//   return passwordChangedTime > jwtIssuedTimestamp;
// };



const User= model<IUser, UserModel>("user", userSchema);
export default User; 