import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/userModel.js";
import mongoose from "mongoose";


//create new post functionality

export const createPost = async(req,res)=>{
    const newPost= new PostModel(req.body)

    try {
        await newPost.save();
        res.status(200).json("post created!")

    } catch (err) {
        res.status(500).json(err)
    }

}

//get post
export const getPost =async(req,res)=>{
    const id=req.params.id
    const {currentPostId}=req.body

    try {  
        const post = await PostModel.findById(id)
        res.status(200).json(post)

    } catch (err) {
        res.status(500).json(err)
    }

}

//updata a post
export const updatePost= async(req,res)=>{
    const postId= req.params.id
    const {userId}=req.body

    try {
        const post= await PostModel.findById(postId)
        if (post.userId=== userId)
        {
            await post.updateOne( {$set:req.body})
            res.status(200).json("post Updated")
        }
        else{
            res.status(403).json("Action forbidden")
        }
    } catch (err) {
        res.status(500).jso(err)
        
    }
}

//post delete

export const postDelete= async(req, res)=>{
    const postId= req.params.id
    const {userId}= req.body

    try {
        const post = await PostModel.findById(postId)
        if(post.userId === userId){
            await post.deleteOne()
            res.status(200).json("post deleted successfully")
        }
        else{
            res.status(403).json("action forbidden")
        }
        
        
    } catch (err) {
        res.status(500).json(err)
        
    }
}

//like and dislike a post

export const likePost = async(req, res)=>{
    const postId =req.params.id
    const {userId}= req.body
    
    try {
        const post = await PostModel.findById(postId)
        if (!post.likes.includes(userId))
        {
            await post.updateOne({$push:{likes:userId}})
            res.status(200).json("post liked successfully")
        }
        else{
            await post.updateOne({$pull:{likes:userId}})
            res.status(201).json("post disliked successfully")
        }
        
    } catch (err) {
        res.status(500).json(err)
    }
}



//timelline post

export const getTimeLinePost= async(req, res)=>{
    const userId=req.params.id

    try {
        const currentUserPost= await PostModel.find({userId:userId})
        const followingPost= await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId) 
                }
            },
            {
                $lookup:{
                    from:"posts",
                    localField:"following",
                    foreignField:"userId",
                    as:"followingPost"
                }
            },
            {
                $project:{
                    followingPost:1,
                    _id:0
                }
            }
        ])
        res.status(200).json(currentUserPost.concat(...followingPost[0].followingPost).
        sort((a,b)=>{return b.createdAt- a.createdAt})
        )
        
    } catch (err) {
        res.status(500).url(err)
    }
}