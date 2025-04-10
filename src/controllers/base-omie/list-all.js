import { BaseOmie } from "../../models/base-omie.js";

export const listAll = async (req, res, next) => {
  try {
    const bases = await BaseOmie.find().select("-appSecret -__v");

    res.status(200).json(bases);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
