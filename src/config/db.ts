import mongoose, { ConnectOptions } from 'mongoose';
import colors from "colors";

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI as string,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } as ConnectOptions)
        console.log(colors.cyan.underline(`MongoDB Connected: ${conn.connection.host}`))
    }catch(err){
        if (err instanceof Error) {
            // ✅ TypeScript knows err is Error
            console.log(colors.red.underline.bold(`Error ${err.message}`))
          } else {
            console.log('Unexpected error', err);
          }
        process.exit(1)
    }
}

export default connectDB;