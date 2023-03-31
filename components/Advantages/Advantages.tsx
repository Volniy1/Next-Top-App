import { AdvantagesProps } from "./Advantages.props";
import styles from "./Advantages.module.css";
import CheckIcon from "./Advantage.svg";
import { Htag } from "../Htag/Htag";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <div className={styles.wrap}>
      {advantages.map((a) => (
        <div key={a._id} className={styles.advantage}>
          <CheckIcon />
          <div className={styles.title}>{a.title}</div>
          <hr className={styles.vline} />
          <div className={styles.desc}>{a.description}</div>
        </div>
      ))}
    </div>
  );
};
