import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import validator from "validator";

const formatdatatoSend = (newUser) => {
  const token = jwt.sign({id: newUser._id}, process.env.JWTSECRET, {
    expiresIn: "1d",
  });
  return {
    message: `welcome ${newUser.username} 🤌🏼 !`,
    user: newUser,
    token,
    success: true,
  };
};

export const register = async (req, res) => {
  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    return res.status(201).send({
      message: "Fields can't be empty!",
      success: false,
    });
  }

  if (username.length < 5) {
    return res.status(500).json({message: "Username can't be less than 5 letters!", success: false});
  }

  if (!validator.isEmail(email)) {
    return res.status(500).json({message: "email is inavalid!", success: false});
  }

  try {
    const userName = await User.findOne({username: username});

    if (userName) {
      return res.status(403).send({
        message: " username already exists !",
        success: false,
      });
    }

    const userEmail = await User.findOne({email: email});

    if (userEmail) {
      return res.status(403).send({
        message: " Email already exists !",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return res.status(201).json(formatdatatoSend(newUser));
  } catch (error) {
    return res.status(500).send({message: "Error Registering user!", success: false});
  }
};

export const signin = async (req, res) => {
  const {data, password} = req.body;

  if (!data || !password) {
    return res.status(201).send({
      message: "Fields can't be empty!",
      success: false,
    });
  }

  let query = {};

  if (validator.isEmail(data)) {
    query = {email: data};
  } else {
    query = {username: data};
  }

  User.findOne(query).then((user) => {
    if (!user) {
      return res.status(403).json({message: "user not found", success: false});
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(503).json({message: "Error occurred while login please try again", success: false});
      }
      if (!result) {
        return res.status(403).json({message: "Incorrect password", success: false});
      } else {
        return res.status(200).json(formatdatatoSend(user));
      }
    });
  });
};

export const getCode = async (req, res) => {
  const Id = req.params.id;
  try {
    const user = await User.findById(Id);
    console.log(user.currentcode);
    return res.status(200).send({
      message: "Code fetched sucessfully",
      url: user.currentcode,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "couldn't find user",
      success: false,
    });
  }
};

export const getUser = async (req, res) => {
  const {userId} = req.body;
  try {
    const user = await User.findById(userId);
    return res.status(200).send({
      message: "User fetched sucessfully",
      user: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "couldn't find user",
      success: false,
    });
  }
};
