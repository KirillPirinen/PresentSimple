import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function NavBar() {
  return (
    <nav>
        <Link to="/">
        Главная
      </Link>
        <Link to="/myWishes" className={styles.link}>
          Мои хотелки
        </Link>
        <Link to="/donatedWishList" className={styles.link}>
        Подаренные подарки
        </Link> 
        <Link to="/lk" className={styles.link}>
        Личный кабинет
      </Link>
        <Link to="/sentList" className={styles.link}>
          Отправленные анкеты
        </Link> 
         <Link to="/registration" className={styles.link}>
        Регистрация
        </Link>
        <Link to="/authorization" className={styles.link}>
          Авторизация
        </Link>
  </nav>
  );
};
