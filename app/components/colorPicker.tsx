import React from "react";
import { IColorPicker } from "../page";
import { cx } from "@emotion/css";

type Props = {
  color: IColorPicker;
  shirtColor: IColorPicker;
  setShirtColor: (color: IColorPicker) => void;
};

function ColorPicker({ setShirtColor, color, shirtColor }: Props) {
  return (
    <div
      style={{ backgroundColor: color }}
      className={cx(
        `hover:ring-blue-500 cursor-pointer text-gray-100 size-6 transition-all rounded-full ring-2 ring-blue-300`,
        shirtColor === color && "ring-blue-700 ring-4"
      )}
      onClick={() => setShirtColor(color)}
    ></div>
  );
}

export default ColorPicker;
