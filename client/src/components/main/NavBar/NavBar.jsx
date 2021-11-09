import { Link, NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import logo from "../../../backgrounds/pslogo.png"
import { NavBtn } from "./NavBtn";
export default function NavBar() {

  const user = useSelector(state => state.user)

  return (
    <nav className={styles.navbar}>
    <Link exact to="/"><img className={styles.logo} width="240px" src={logo}/></Link>
  <div className={styles.wrapper}>
      <NavLink activeClassName={styles.active} exact to="/"><NavBtn>Главная</NavBtn></NavLink>
      { user ?
      <>
        <NavLink activeClassName={styles.active} exact to="/auth/signout"><NavBtn>Выйти</NavBtn></NavLink>
        <NavLink activeClassName={styles.active} to="/lk"><NavBtn>Личный кабинет</NavBtn></NavLink>
        <NavLink activeClassName={styles.active} to="/search"><NavBtn>Найти человека</NavBtn></NavLink>
      </>
          :
      <>
      <NavLink activeClassName={styles.active} to="/auth/signup"><NavBtn>Зарегистрироваться</NavBtn></NavLink>
      <NavLink activeClassName={styles.active} exact to="/auth/signin"><NavBtn>Войти</NavBtn></NavLink>
      </>
      } 
  </div>
</nav>
  
  );
    }
