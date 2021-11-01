import { useDispatch, useSelector } from 'react-redux';
import { infoModalDeactivate } from '../../redux/actions/modalInfoAC';
import './modal.css';

function ModalInfo({children}) {
  const modal = useSelector(state=>state.modalInfo)
  const dispatch = useDispatch()

  const clickBodyHandler = () => {
    dispatch(infoModalDeactivate())
  }

  return (
    <div onClick={clickBodyHandler} className={modal ? 'modal active' : 'modal'}> 
      {children}
    </div>
  );
}

export default ModalInfo;
