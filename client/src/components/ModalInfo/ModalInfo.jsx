import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/actions/error.ac';
import { infoModalDeactivate } from '../../redux/actions/modalInfoAC';
import styles from './styles.module.css';

function ModalInfo({children}) {
  const modal = useSelector(state=>state.modalInfo)
  const dispatch = useDispatch()
  useEffect(()=>{
    return dispatch(clearError())
  },[])
  const clickBodyHandler = () => {
    dispatch(clearError())
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
