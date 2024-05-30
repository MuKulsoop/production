import mongoose from "mongoose"

const Connection = async ( URL ) => {
    
    try{
        await mongoose.connect( URL )
        console.log("The database is successfully connected.")
    } catch ( error ){
        console.log("Error while connecting the database", error)
    }
}

export default Connection;