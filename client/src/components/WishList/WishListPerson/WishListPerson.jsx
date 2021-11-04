import Wish from '../Wish/Wish';
import { useHistory, useParams } from 'react-router';
import { addAlone, joinGroup } from '../../../redux/actions/groupModal';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../../main/Progrssbar/Progrssbar';
import { useEffect } from 'react';
import { getWishesPersonWatchPeople } from '../../../redux/actions/groupModal';
import { getProgressbar } from '../../../redux/actions/Progressbar.ac';
import ModalInfo from '../../ModalInfo/ModalInfo';
import styles from './styles.module.css'

export default function WishListPerson() {

  const wishesGroupAlone = useSelector(state => state.wishesGroupAlone);

  const progressbar = useSelector(state => state.progressbar) //здесь все группы
  const groups = progressbar?.map(el => el.Group)

  const {user_id} = useParams()

  useEffect(() => {
     dispatch(getWishesPersonWatchPeople(user_id))
     dispatch(getProgressbar(progressbar))
  }, [])

  const dispatch = useDispatch()
  const history = useHistory()

  
  const progressbarData = (maxusers, currentusers) => [{ completed: currentusers, width: maxusers }];

  return (
    <>
    <div className="container-glass d-flex justify-content-between flex-row alighn-center flex-wrap">
      <>
      <h3>Хотелки пользователя: {wishesGroupAlone?.User?.name} {wishesGroupAlone?.User?.lname}</h3>
      
      {wishesGroupAlone &&
      wishesGroupAlone?.Wishes?.map(el => {
        return (
      
        <Wish key={el.id} WishPhoto={el.WishPhoto?.image} title={el.title} description={el.description} isBinded={el.isBinded}>
          
          <div>
     
     {!el.isBinded ?
          <div className={styles.buttons}>
          <a onClick={() => dispatch(addAlone(el.id, user_id))}>Подарить самому</a>
          <a onClick={() => history.push(`/modalGroup/${el.id}/${user_id}`)}>Подарить группой(создать группу)</a>
          </div>
          :
        el.isBinded && !el.Group ? 
       <h5 className={styles.bron}>Забронировано</h5>  : 
            <>
              
            {groups ?
               groups?.map(progress => progress?.wish_id === el.id ?
                progress?.maxusers !== progress?.currentusers ?
                  
                <div className="d-flex flex-column justify-content-center">
                {progressbarData(progress.maxusers, progress.currentusers).map((item, idx) => (
                  <>
                  <div className={styles.progressbar}>
                    
                    <ProgressBar
                      key={idx}
                      completed={item.completed}
                      width={item.width}
                    />
                    <p>В группу вступили: {progress.currentusers}</p>
                    {/*<p>Всего должно быть: {progress.maxusers}</p>*/}
                    <p>Группа в телеграмм</p>
                    <a className={styles.linkTelegram} href={progress.telegram}>Группа в Телеграме</a>
                    </div>
                    </>
                ))}
                   <a onClick={() => dispatch(joinGroup(el.id, user_id))}>Подарить группой(вступить в группу)</a>
                </div>
                 : <h5 className={styles.bron}>Забронировано</h5> 
                     : '')
            : ''}
            </>  
     }
        </div>

          
          </Wish>)
      })}
      </>
    </div>
    <ModalInfo/>
    </>
  )
}




