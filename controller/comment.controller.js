
import Comment from "../models/comment.js"
import mongoose from "mongoose";

export const newComment = async (request, response) => {
    try{
        const comment = await new Comment(request.body)
        comment.save();
        response.status(200).json({msg: "comment saved successfully"})
    } catch( error ){
        response.status(500).json({ msg: error.message })
    }
}

export const getComments = async (request, response) => {
    try{ 
        const postId = request.params.id;
        const comments = await Comment.find( { postId })
        
        response.status(200).json(comments)
    }
    catch ( error ) {
        response.status(500).json({ msg: error.message })
    }
}

export const deleteComment = async (request, response) => {
    try{
        await Comment.findByIdAndDelete(request.params.id);
        response.status(200).json({ msg: "comment deleted successfully."})
    }
    catch(error){   
        response.status(500).json({msg: error.message})
    }   
}