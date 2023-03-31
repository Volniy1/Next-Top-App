import { ReviewFormProps } from "./ReviewForm.props";
import styles from "./ReviewForm.module.css";
import cn from "classnames";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { TextArea } from "../TextArea/TextArea";
import { Button } from "../Button/Button";
import CloseIcon from "./closeIcon.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";
import { useState } from "react";

export const ReviewForm = ({
  productId,
  className,
  isOpened,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError("Что-то пошло не так");
      }
    } catch (e) {
      if (e instanceof Error) {
        setIsError(e.message);
      }
    }
  };
  const handleKeyDown = (key: KeyboardEvent) => {
    if (
      key.code == "Space" ||
      key.code == "Enter" ||
      key.code == "NumpadEnter"
    ) {
      key.preventDefault();
      return setIsSuccess(false), setIsError(undefined);
    }
    return;
  };
  // console.log({ ...register("title") });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register("name", {
            required: { value: true, message: "Введите имя" },
          })}
          placeholder="Имя"
          error={errors.name}
          onError={() => console.log("error")}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          {...register("title", {
            required: {
              value: true,
              message: "Введите заголово",
            },
          })}
          placeholder="Заголовок Отзыва"
          className={styles.title}
          error={errors.title}
          onError={() => console.log("error")}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: {
                value: true,
                message: "Укажите Рейтинг",
              },
            }}
            render={({ field }) => (
              <Rating
                tabIndex={isOpened ? 0 : -1}
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                error={errors.rating}
              />
            )}
          />
        </div>
        <TextArea
          {...register("description", {
            required: {
              value: true,
              message: "Заполните Описание",
            },
          })}
          className={styles.descr}
          placeholder="Текст Отзыва"
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label="Текст отзыва"
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button
            appearence="primary"
            tabIndex={isOpened ? 0 : -1}
            onClick={() => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      <div>
        {isSuccess && (
          <div className={cn(styles.success, styles.panel)} role="alert">
            <div className={styles.successTitle}>Ваш Отзыв Отправлен</div>
            <div className={styles.description}>
              Благодарим, Ваш отзыв будет опубликован после проверки
            </div>
            <button
              onClick={() => setIsSuccess(false)}
              onKeyDown={handleKeyDown}
              className={styles.closeIcon}
              tabIndex={isSuccess && isOpened ? 0 : -1}
              aria-label={isSuccess ? " закрыть оповещение" : ""}
            >
              <CloseIcon />
            </button>
          </div>
        )}
        {isError && (
          <div className={cn(styles.error, styles.panel)} role="alert">
            Что-то пошло не так, попробуйте обновить страницу
            <CloseIcon
              role="button"
              onClick={() => setIsError(undefined)}
              className={styles.closeIcon}
              onKeyDown={handleKeyDown}
              tabIndex={!isSuccess && isOpened ? 0 : -1}
              aria-label={isSuccess ? " закрыть оповещение" : ""}
            />
          </div>
        )}
      </div>
    </form>
  );
};
