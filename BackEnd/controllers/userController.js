const UserDataModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;
    const existingUser = await UserDataModel.findOne({
      userEmail: userEmail,
    });

    if (existingUser) {
      res.json("Email Already registered");
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(userPassword,10);
    } catch (error) {
      return res.status(400).json({
        message: "Password Hashing failed",
      })
    }

    const newUser = await UserDataModel.create({
      userName,
      userEmail,
      userPassword : hashedPassword
    });
    res.status(200).json({
      message: "User registered successfully",
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      return res.status(400).json({
        status: "failure",
        message: "Please provide email and password",
      });
    }

    let user = await UserDataModel.findOne({ userEmail: userEmail });
    if (!user) {
      return res.json({
        status: "failure",
        message: "User not found, Create a new account and try again",
      });
    }

    const payload = {
      userId: user._id,
      userEmail: user.userEmail
    }
    if (await bcrypt.compare(userPassword, user.userPassword)){
      let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1m",
      });

      res.status(200).json({
        status: "success",
        userId: user._id,
        token: token,
      })
    } else {
      return res.json({
        status: "failure",
        message: "Invalid password",
      });
    }
  }
  catch (error) {
    res.status(500).json({
      message: "Error logging in user",
    });
  }
}
