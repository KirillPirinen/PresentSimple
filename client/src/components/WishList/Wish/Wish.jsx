import styles from "./styles2.module.css"

function Wish({wishPhoto, children, title, description, isBinded}) {
  return (
    <div className={styles.container}>
        <div className={styles.card}>
            <div className={`${styles.face} ${styles.face1}`}>
                <div className={styles.content}>
                    <img src={wishPhoto ? `http://localhost:3001/${wishPhoto.replace('public/', '')}` : 'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1RkYs4tTgxg7vt9wxbBaDlsdqaKTM5SRkZCeTgDn6uOyic'}/>
                </div>
            </div>
            <div className={`${styles.face} ${styles.face2}`}>
                <div className={styles.content}>
                <figure class="text-end">
                  <blockquote class="blockquote">
                  <dd className="col-sm-12">{title}</dd>
                  {description && <span>{description}</span>}
                  </blockquote>
                </figure>
                    
                      {children}
                </div>
            </div>
        </div>
   </div>
  )
}

export default Wish
