import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import {Navbar, NavbarToggler, Collapse, Nav, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem } from 'reactstrap';
import { useState } from "react";
import { useParams } from "react-router";

export default function NavBar() {

  const user = useSelector(state => state.user)
  const {user_id} = useParams()

  const [open, setOpen] = useState(false)

  return (
  <Navbar
    color="light"
    container="fluid"
    expand="sm"
    fixed="top"
    light
  >
    <NavbarToggler />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
         <UncontrolledDropdown
          inNavbar
          nav
        >
          <DropdownToggle
            caret
            nav
          >
        Личный кабинет
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
            <Link to="/lk" className={styles.link}>
            Личный кабинет
              </Link>
            </DropdownItem>

            <DropdownItem>
            <Link to="/myWishes" className={styles.link}>
                Мои хотелки
              </Link>
            </DropdownItem>

            <DropdownItem>
            <Link to="/donatedWishList" className={styles.link}>
              Мне подарили
            </Link> 
            </DropdownItem>

            <DropdownItem>
            <Link to="/sentList" className={styles.link}>
          Отправленные анкеты
            </Link> 
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

          <Link to={`/wishListPerson/${user_id}`} className={styles.link}>
            Мои желания, которые видны всем
        </Link> 

        <Link to="/" className={styles.link}>
         Главная
       </Link>

        { user ?
        <Link exact to="/auth/signout" className={styles.link}>Выйти</Link>
            :
          <>
      <Link to="/auth/signup" className={styles.link}>Зарегистрироваться</Link>
      <Link exact to="/auth/signin" className={styles.link}>Войти</Link>
          </>}
      </Nav>
    </Collapse>
  </Navbar>
  );
};
