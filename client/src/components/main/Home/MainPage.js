import styles from "./styles.module.css";

export const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftdiv}>
        <h2 className={styles.header}>Дарить подарки ещё никогда не было так просто</h2>
        <p className={styles.maintext}>
          Попробуй воспользоваться нашим сервисом, и ты больше никогда не будешь ломать голову
          что подарить своему другу!
        </p>
      </div>
      <div className={styles.rightdiv}>
        
      </div>
    </div>
  )
}
