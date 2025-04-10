import { Template } from "../../models/template.js";

export const listAll = async (req, res, next) => {
  try {
    const templates = await Template.find().select("-__v");

    res.status(200).json(templates);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
