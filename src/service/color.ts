import { Color as ColorInterface } from "../interface/color";
import { Color } from "../models/color";

export const _createColor = async (color: ColorInterface) => {
  try {
    const newColor = await Color.create(color);
    return {
      msg: newColor,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: error,
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
      msg: error,
      success: false,
      status: 400,
    };
  }
};
