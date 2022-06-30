import classNames from 'classnames';
import styles from './Button.module.css';

function Button({ children, variant, className }) {
  return (
    <button
      className={classNames(
        styles.button,
        variant && styles[variant],
        className,
      )}
    >{children}</button>
  );
}

export default Button;