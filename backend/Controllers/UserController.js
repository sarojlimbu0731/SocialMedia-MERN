import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//get users

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...updatedUser } = user._doc;
      res.status(200).json(updatedUser);
    } else {
      res.status(400).json("No such user exist");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//update users
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdminStatus, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token =jwt.sign({
        username: user.username,id:user._id
      }, process.env.JWT_SECRET, {expiresIn: "1h"})
      res.status(200).json({user,token});
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json("access Denied, you can access only yours profile");
  }
};

export const deleteUser= async (req, res)=>{
    const id =req.params.id
    const {currentUserId, currentUserAdminStatus}=req.body

    if (id=== currentUserId || currentUserAdminStatus){
        try {
            const user=await UserModel.findByIdAndDelete(id)
            res.status(200).json("successfully deleted user")
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.send(404).json("user not found")
    }
}

//follow a user

export const followUser= async(req,res)=>{
    const id =req.params.id
    const {currentUserId, currentUserAdminStatus}= req.body

    if (id === currentUserId){
        res.status(403).json("Action forbidden")
    }
    else{
        try {
            const followUser= await UserModel.findById(id)
            const followingUser= await UserModel.findById(currentUserId)
            if (!followUser.follower.includes(currentUserId)){
                await followUser.updateOne({$push:{follower:currentUserId}})
                await followingUser.updateOne({$push:{following:id}})
                res.status(200).json("User followed!")
            }
            else{
                res.status(403).json("User is already followed!")
            }
            
        } catch (err) {
            res.status(500).json(err)
            
        }
    }
}

//unfolow a user
export const unfollowUser = async (req, res) => {
  const id = req.params.id; //to follow
  const { currentUserId, currentUserAdminStatus } = req.body; //will follow

  if (id === currentUserId) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);
      if (followUser.follower.includes(currentUserId)) {
        await followUser.deleteOne({ $pull: { follower: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User unfollowed!");
      } else {
        res.status(403).json("User is not followed by you!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
