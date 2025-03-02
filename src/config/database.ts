import mongoose from "mongoose";
import { ENV } from "./env";

export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log("Успешное подключение к MongoDB!");
    } catch (error) {
        console.error("Ошибка подключения к MongoDB: ", error);
        process.exit(1);
    }
};