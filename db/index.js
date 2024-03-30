import mongoose from "mongoose";

const mongooseConnectionString = `mongodb+srv://kunalmukherjee12:${process.env.MONGOATLAS_PASSWORD}@mobilestore.cfwfgmc.mongodb.net/ecommerce-app`

export const connectToDb = () => mongoose.connect(
    mongooseConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)