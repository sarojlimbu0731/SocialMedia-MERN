import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";

//registering a new user
export const registerUser = async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedpass = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    username,
    password: hashedpass,
    firstname,
    lastname,
  });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};

//login user

export const loginUser = async (req,res)=> {
    const {username, password}= req.body;
    try {
        const user =await UserModel.findOne({username:username})

        if (user){
            const validity= await bcrypt.compare(password,user.password);
            validity ? res.status(200).json(user): res.status(400).json("Wrong Password")
        }
        else{
            res.status(404).json("User doesn't exist")
        }
        
    } catch (err) {
        res.statu(500).json({message: err.message})
        
    }
}
