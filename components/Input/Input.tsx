import { InputProps } from "./Input.props";
import styles from "./Input.module.css";
import cn from "classnames";
import React, { forwardRef } from "react";
// import { ForwardedRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref): JSX.Element => {
    return (
      <div className={cn(className, styles.inputWrapper)}>
        <input
          className={cn(styles.input, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}
        />
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

// export const Input = forwardRef(
//   (
//     { className, ...props }: InputProps,
//     ref: ForwardedRef<HTMLInputElement>
//   ): JSX.Element => {
//     return (
//       <input className={cn(className, styles.input)} ref={ref} {...props} />
//     );
//   }
// );
