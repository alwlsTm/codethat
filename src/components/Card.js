import classNames from "classnames";
import styles from './Card.module.css';

//코스 소개 카드
function Card({ className, children }) {
  return (
    <div className={classNames(styles.card, className)}>
      {children}
    </div>
  );
}

export default Card;