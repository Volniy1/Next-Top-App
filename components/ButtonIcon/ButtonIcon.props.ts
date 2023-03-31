import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import up from "./upIcon.svg";
import close from "./closeIcon.svg";
import menu from "./tabIcon.svg";

export const icons = {
  up,
  close,
  menu,
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconName;
  appearence: "primary" | "white";
}
