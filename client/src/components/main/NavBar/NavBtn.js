import styles from "./styles.module.css";
export const NavBtn = ({children}) => {
  return (
    <div className={styles.navbtn}><span>{children}</span><div></div></div>
  )
}
