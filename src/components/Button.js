import classNames from 'classnames';
import styles from './Button.module.css';

function Button({ children, variant, className, onClick }) {
  return (
    <button
      className={classNames(
        styles.button,
        variant && styles[variant],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;