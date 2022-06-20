import classNames from 'classnames';
import styles from './ListPage.module.css';
import catalog from '../IMGS/catalog.svg';
import community from '../IMGS/community.svg';
import Container from './Container';

const ICON = {
  catalog: {    //카탈로그
    src: catalog,
    alt: '책',
  },
  community: {  //커뮤니티
    src: community,
    alt: '말풍선',
  },
}

//카탈로그 & 커뮤니티 페이지 공용 컴포넌트
function ListPage({
  variant = 'catalog',  //src & alt
  title = '',       //title
  description = '', //설명글
  children,
}) {
  const icon = ICON[variant] || ICON.catalog;
  return (
    <>
      <div className={classNames(styles.bg, styles[variant])}>
        <img className={styles.icon} src={icon.src} alt={icon.alt}></img>
        <div className={styles.texts}>
          <h1 className={styles.heading}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <Container className={styles.container}>{children}</Container>
    </>

  );
}

export default ListPage;