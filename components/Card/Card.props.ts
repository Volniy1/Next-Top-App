import { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react";

export interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: "white" | "blue" | "p3";
  children: ReactNode;
}
