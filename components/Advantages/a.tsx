import { AdvantagesProps } from "./Advantages.props";
import styles from "./Advantages.module.css";
import AdvantageIcon from "./Advantage.svg";
import { Htag } from "../Htag/Htag";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <div className={styles.wrap}>
      <Htag tag="h2">Преимущества</Htag>
      <div className={styles.advantagesWrap}>
        {advantages.map((a) => (
          <div key={a._id} className={styles.advantages}>
            <AdvantageIcon />
            <div className={styles.advantagesData}>
              <div className={styles.title}>{a.title}</div>
            </div>
            <hr></hr>
            <div>{a.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
