import mongoose from "mongoose";

const ConnectionToDatabase = async () => {
    try {

        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Database Successfully");

    } catch (error) {

        console.log("Error in Database Connection", error);

    }
}

export default ConnectionToDatabase;