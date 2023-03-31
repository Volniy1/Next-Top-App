// import { HtagProps } from "./button.props";
import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";
import cn from "classnames";
import ArrownIcon from "./arrow.svg";
import { motion, useMotionValue } from "framer-motion";

export const Button = ({
  appearence,
  arrow = "none",
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  const scale = useMotionValue(1);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={cn(styles.button, className, {
        [styles.primary]: appearence == "primary",
        [styles.ghost]: appearence == "ghost",
      })}
      style={{ scale }}
      {...props}
    >
      {children}
      {arrow !== "none" && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow == "down",
          })}
        >
          <ArrownIcon />
        </span>
      )}
    </motion.button>
  );
};
