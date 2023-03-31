import { PtagProps } from "./Ptag.props";
import styles from "./Ptag.module.css";
import cn from "classnames";

export const P = ({
  size = "p2",
  children,
  className,
  ...props
}: PtagProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.p1]: size == "p1",
        [styles.p2]: size == "p2",
        [styles.p3]: size == "p3",
      })}
      {...props}
    >
      {children}
    </p>
  );
};
