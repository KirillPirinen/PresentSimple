import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';

export default function NavBar() {

  const user = useSelector(state => state.user)

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
        <Link to="/wishListPerson" className={styles.link}>
          Мои желания, которые видны всем
        </Link> 
        { user ?
        <Link exact to="/auth/signout">Выйти</Link>
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
