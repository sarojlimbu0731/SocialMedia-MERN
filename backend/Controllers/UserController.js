import UserModel from "../Models/userModel.js";

//get users

export const getUser= async(req, res)=>{
    const id = req.params.id;

    try {
            const user = await UserModel.findById(id);
            if (user){
                const {password, ...updatedUser}= user._doc
                res.status(200).json(updatedUser)
            }
            else{
                res.status(400).json("No such user exist")
            }
        
    } catch (err) {
        res.status(500).json(err)      
    }
}

//update users
export const updateUser= async (req, res)=>{
    const id =req.params.id
    const {currentUserId, currentUserAdminStatus, password}= req.body;

    if (id=== currentUserId || currentUserAdminStatus){
        try {
            const user = await UserModel.findByIdAndUpdate(id, req.body,{new: true})
            res.status(200).json(user)
        } catch (error) {
            res.status.json(error)
            
        }

    }

}