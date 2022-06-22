import mongoose from 'mongoose';
import { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
        },

        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        
        password: {
            type: String,
            required: true,
        },

        token: {
            type: String,
            required: false,
        }
    }
)

export const UserModel = mongoose.model('UserSchema', UserSchema);


