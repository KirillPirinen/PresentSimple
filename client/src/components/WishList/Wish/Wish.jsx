import styles from "./styles2.module.css"

function Wish({wishPhoto, children, title, description, isBinded}) {
  return (
    <div className={styles.container}>
        <div className={styles.card}>
            <div className={`${styles.face} ${styles.face1}`}>
                <div className={styles.content}>
                    <img src={wishPhoto ? `http://localhost:3001/${wishPhoto.replace('public/', '')}` : 'http://localhost:3001/uploads/defaultizo.jpg'}/>
                    <h3>{title}</h3>
                </div>
            </div>
            <div className={`${styles.face} ${styles.face2}`}>
                <div className={styles.content}>
                <figure class="text-end">
                  <blockquote class="blockquote">
                  <dd className="col-sm-12">{description ? description : 'Пользователь не добавил детальное описание'}</dd>
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
