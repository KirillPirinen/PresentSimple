import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, clearInfo } from '../../redux/actions/error.ac';
import { infoModalActivate, infoModalDeactivate } from '../../redux/actions/modalInfoAC';
import { ListOfForms } from '../CheckFormToPerson/subComponents/ListOfForms';
import { RecipientInfoBlock } from '../CheckFormToPerson/subComponents/recipientInfoBlock';

import styles from './styles.module.css';
import { ErrorMessage } from './subComponents/ErrorMessage';
import {InfoMessage} from './subComponents/InfoMessage'

function ModalInfo({children}) {
  const modal = useSelector(state=>state.modalInfo)
  const error = useSelector(state=>state.error)
  const info  = useSelector(state=>state.info)
  const {recipient, forms} = useSelector(state=>state.checkform)

  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(error || info || recipient || forms) {
      dispatch(infoModalActivate())
    }
  },[error, info, recipient, forms])

  const clickBodyHandler = () => {
    dispatch(clearError())
    dispatch(clearInfo())
    dispatch(infoModalDeactivate())
  }

  return (
    <div onClick={clickBodyHandler} className={modal ? `${styles['info-modal']} ${styles.active}` : styles['info-modal']}>
      <h2 className={styles.clickhere}>Кликни чтобы выйти</h2> 
      <div onClick={(e) => e.stopPropagation()} className={styles['info-modal_content']}>
          {error ? <ErrorMessage message={error}/> :
          info ? <InfoMessage message={info}/> :
          recipient ? <RecipientInfoBlock recipient={recipient}/> :
          forms ? <ListOfForms forms={forms}/> :
          children
          }
      </div>
    </div>
  );
}

export default ModalInfo;
