import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";

export default function NavBar() {

  const user = useSelector(state => state.user)

  return (
    <nav>
  <ul>
    <li>
      <Link exact to="/auth/signout">Главная</Link>
    </li>
      { user ?
      <>
      <li>
        <Link exact to="/auth/signout">Выйти</Link>
      </li>
      <li>
        <Link to="/lk"> Личный кабинет</Link>
      </li>
      <li>
        <Link to="/search">Найти человека</Link>
      </li>
      </>
          :
      <>
      <li>
      <Link to="/auth/signup" className={styles.link}>Зарегистрироваться</Link>
      </li>
      <li>
      <Link exact to="/auth/signin" className={styles.link}>Войти</Link>
      </li>
      </>
      } 
  </ul>
</nav>
  
  );
    }
//<nav>
{/* <Link to="/" className={styles.link}>
  Главная
</Link>
  { user ?
  <>
  <Link exact to="/auth/signout" className={styles.link}>Выйти</Link>
  <Link to="/lk" className={styles.link}> Личный кабинет</Link>
  <Link to="/search" className={styles.link}>Найти человека</Link>
  </>
      :
<>
<Link to="/auth/signup" className={styles.link}>Зарегистрироваться</Link>
<Link exact to="/auth/signin" className={styles.link}>Войти</Link>
    </>
  } */}
