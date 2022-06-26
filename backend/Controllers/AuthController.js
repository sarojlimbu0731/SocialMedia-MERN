import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//registering a new user
export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedpass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedpass;
  const newUser = new UserModel(req.body);
  const { username } = req.body;
  try {
    const olduser = await UserModel.findOne({ username });
    if (olduser) {
      res.status(404).json({ message: "username already exist" });
    } else {
      const user = await newUser.save();
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//login user

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.status(404).json("Wrong Password");
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({user,token})
      }
    } else {
      res.status(404).json("User doesn't exist");
    }
  } catch (err) {
    res.statu(500).json({ message: err.message });
  }
};
