import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, clearInfo } from '../../redux/actions/error.ac';
import { infoModalActivate, infoModalDeactivate } from '../../redux/actions/modalInfoAC';

import styles from './styles.module.css';
import { ErrorMessage } from './subComponents/ErrorMessage';

function ModalInfo({children}) {
  const modal = useSelector(state=>state.modalInfo)
  const error = useSelector(state=>state.error)
  const info  = useSelector(state=>state.info)
 
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(error || info) {
      dispatch(infoModalActivate())
    }
  },[error, info])

  const clickBodyHandler = () => {
    dispatch(clearError())
    dispatch(clearInfo())
    dispatch(infoModalDeactivate())
  }

  return (
    <div onClick={clickBodyHandler} className={modal ? `${styles['info-modal']} ${styles.active}` : styles['info-modal']}>
      <h2 className={styles.clickhere}>Кликни чтобы выйти</h2> 
      <div onClick={(e) => e.stopPropagation()} className={styles['info-modal_content']}>
          {error ? 
          <ErrorMessage message={error}/> :
          info ?
          <ErrorMessage message={info}/> :
          children
          }
      </div>
    </div>
  );
}

export default ModalInfo;
