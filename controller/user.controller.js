
import User from "../models/user.model.js"
import Token from "../models/token.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();


export const signUpUser = async (request, response) => {
    try{
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const userbody = {
            username : request.body.username,
            name : request.body.name,
            password : hashedPassword
        };
        const newUser = new User(userbody);
        await newUser.save();
        
        return response.status(200).json({msg: "User saved successfully"})
    } catch (error) {
        return response.status(500).json({msg: "Error occured while saving User ", error})
    }
}

export const loginUser = async ( request, response ) => {
    const user = await User.findOne({ username : request.body.username })
    if ( !user ) {
        return response.status(400).json({msg : "usename does not matches"})
    }
    try{    
        let match = await bcrypt.compare(request.body.password, user.password);
        if( match ){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY , { expiresIn : '15m'} );
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)
            const newToken = new Token( { token : refreshToken })
            await newToken.save()
            return response.status(200).json({ accessToken : accessToken , refreshToken : refreshToken , name : user.name , username : user.username})
        } 
        else{
            return response.status(400).json({ msg : "Password does not match "})
        }


    } catch(error) {
        response.status(500).json({ msg : "Error while logining in user "})
    }
}
