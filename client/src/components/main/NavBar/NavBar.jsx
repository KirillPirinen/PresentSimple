
   
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";

export default function NavBar() {

  const user = useSelector(state => state.user)

  return (
    <nav>
        <Link to="/" className={styles.link}>
        Главная
      </Link>
        <Link to="/lk" className={styles.link}>
        Личный кабинет
      </Link>
        { user ?
        <Link exact to="/auth/signout" className={styles.link}>Выйти</Link>
            :
          <>
      <Link to="/auth/signup" className={styles.link}>Зарегистрироваться</Link>
      <Link exact to="/auth/signin" className={styles.link}>
        Войти
      </Link>
          </>
        }
  </nav>
  );
};
