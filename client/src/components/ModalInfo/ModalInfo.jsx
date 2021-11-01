import { useDispatch, useSelector } from 'react-redux';
import { infoModalDeactivate } from '../../redux/actions/modalInfoAC';
import styles from './styles.module.css';

function ModalInfo({children}) {
  const modal = useSelector(state=>state.modalInfo)
  const dispatch = useDispatch()

  const clickBodyHandler = () => {
    dispatch(infoModalDeactivate())
  }

  return (
    <div onClick={clickBodyHandler} className={modal ? `${styles['info-modal']} ${styles.active}` : styles['info-modal']}> 
      <div onClick={(e) => e.stopPropagation()} className={styles['info-modal_content']}>
          {children}
      </div>
    </div>
  );
}

export default ModalInfo;
