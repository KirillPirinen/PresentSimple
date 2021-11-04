import styles from '../styles.module.css';

export const ErrorMessage = ({children, message}) => {
  return (
  <div class={styles.error} role="alert">
    {message}
    <hr/>
    {children}
  </div>
  )
}
