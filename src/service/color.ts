import { Color as ColorInterface } from "../interface/color";
import { Color } from "../models/color";

export const _createColor = async (color: ColorInterface) => {
  try {
    const newColor = await Color.create(color);

    return {
      message: newColor,
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      message: error,
      success: false,
      status: 400,
    };
  }
};

export const _getColores = async () => {
  try {
    const items = await Color.findAll();
    return {
      items,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: error,
      success: false,
      status: 500,
    };
  }
};
