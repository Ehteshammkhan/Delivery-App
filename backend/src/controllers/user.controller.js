import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login User method
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Normalize email to lowercase
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = createUserToken(user._id, { expiresIn: "1h" });

    await res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createUserToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User method
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid email",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();

    // Generate token
    const userToken = createUserToken(user._id);

    return res.status(201).json({
      success: true,
      userToken,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "User not registered",
    });
  }
};

export { loginUser, registerUser };
