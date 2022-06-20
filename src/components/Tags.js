import styles from './Tags.module.css';

//코스 난이도 태그
function Tags({ values = [] }) {
  return (
    <ul className={styles.tags}>
      {values.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  );
}

export default Tags;