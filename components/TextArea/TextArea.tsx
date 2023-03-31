import { TextAreaProps } from "./TextArea.props";
import styles from "./TextArea.module.css";
import cn from "classnames";
import { forwardRef } from "react";
// import { ForwardedRef } from "react";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, className, ...props }, ref): JSX.Element => {
    return (
      <div className={cn(className, styles.textAreaWrapper)}>
        <textarea
          className={cn(styles.TextArea, {
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
// export const TextArea = forwardRef(
//   (
//     { className, ...props }: TextAreaProps,
//     ref: ForwardedRef<HTMLTextAreaElement>
//   ): JSX.Element => {
//     return (
//       <textarea
//         className={cn(className, styles.TextArea)}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
