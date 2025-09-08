const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'User already exists, you can login', success: false });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: 'Signup successfully',
      success: true,
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
}




const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // User exist check
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found, please signup first",
                success: false
            });
        }

        // Password compare
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }

        // JWT Token generate
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET, // .env file me define karo
            { expiresIn: "1h" }
        );

        // Success response with token
        return res.status(200).json({
            message: "Login successful",
            success: true,
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};



module.exports = { signup , login };
