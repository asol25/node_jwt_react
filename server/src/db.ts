import mongoose from "mongoose";

export const db = () => {
    mongoose.connect('mongodb://localhost:27017/OD_STREAM').then(() => console.log('connect Database!')).catch((err) => console.error(err));
};

export default db