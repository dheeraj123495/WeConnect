const UserDataModel = require("../models/userModel");
exports.registerUser = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;
    const existingUser = await UserDataModel.findOne({
      userEmail:userEmail,
    });

    if (existingUser) {
      res.json("Email Already registered");
    } else {
      const newUser = await UserDataModel.create({ userName, userEmail, userPassword });
      res.status(200).json({
        message:"User registered successfully",
        success: true,
        data: newUser,
      });
    }
  } catch (error) {
    console.error("Error : " + error.message);
    res.status(500).json({
      message: "Error registering user",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const existingUser = await UserDataModel.findOne({
      userEmail:userEmail
    })
    if (existingUser) {
      res.status(200).json({
        status: "success",
        userId : existingUser._id
      });
    } else {
      res.json({
        status: "failure",
        message : "User not found, Create a new account and try again"
      });
    }
  }
  catch (error) {
    console.error("Error : " + error.message);
    res.status(500).json({
      message: "Error logging in user",
    });
  }
}