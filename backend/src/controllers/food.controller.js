import foodModel from "../models/food.model.js";
import fs from "fs";

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.status(200).json({
      success: true,
      message: "Food Added",
    });
  } catch (error) {
    console.log("Food is not added", error);
    res.status(500).json({
      success: false,
      message: "Food not added",
      error: error.message,
    });
  }
};

const foodList = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    console.log(foods);
    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log("Error fetching food list:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching food list",
      error: error.message,
    });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    console.log("req body:: ", req.body);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    // Deleting the image file
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.log("Error deleting image file:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to delete image file",
        });
      }
    });

    // Deleting the food item from the database
    await foodModel.findByIdAndDelete(req.body.id);

    res.status(200).json({
      success: true,
      message: "Food item deleted",
    });
  } catch (error) {
    console.log("Error deleting food:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting food",
      error: error.message,
    });
  }
};

export { addFood, foodList, removeFood };
