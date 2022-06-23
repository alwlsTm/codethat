import classNames from 'classnames';
import styles from './Warn.module.css';
import warnIcon from '../IMGS/warn.svg';

function Warn({ className, variant = '', title = '', description = '' }) {
  return (
    <div className={classNames(styles.warn, styles[variant], className)}>
      <img className={styles.icon} src={warnIcon} alt="경고"></img>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default Warn;