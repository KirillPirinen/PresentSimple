import styles from '../styles.module.css';

export const InfoMessage = ({children, message}) => {
  return (
  <div class={styles.info} role="alert">
    {message}
    <hr/>
    {children}
  </div>
  )
}
