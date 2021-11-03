import Wish from '../Wish/Wish';
import {Button} from 'reactstrap';
import { useHistory, useParams } from 'react-router';
import { addAlone, joinGroup } from '../../../redux/actions/groupModal';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../../main/Progrssbar/Progrssbar';
import { useEffect, useState } from 'react';
import { getWishesPersonWatchPeople } from '../../../redux/actions/groupModal';
import { getProgressbar, deleteProgressbar } from '../../../redux/actions/Progressbar.ac';
import ModalInfo from '../../ModalInfo/ModalInfo';

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

  
  const progressbarData = (maxusers, currentusers) => [{ bgcolor: "#6a1b9a", completed: currentusers, width: maxusers }];

  return (

    <>
    {wishesGroupAlone ?
    (wishesGroupAlone?.Wishes?.map(el =>
      <li key={el.id}>
        <div style={{display:'flex'}}>
        <Wish photo={el.photo} title={el.title} description={el.description} isBinded={el.isBinded} />
     
     {!el.isBinded ?
          <>
          <Button onClick={() => dispatch(addAlone(el.id, user_id))}>Подарить самому</Button>
          <Button onClick={() => history.push(`/modalGroup/${el.id}/${user_id}`)}>Подарить группой(создать группу)</Button>
          </>
          :
        el.isBinded && !el.Group ? 
       <h5>Забронировано</h5>  : 
            <>
              
            {groups ?
               groups?.map(progress => progress?.wish_id === el.id ?
                progress?.maxusers !== progress?.currentusers ?
                  
                <div>
                {progressbarData(progress.maxusers, progress.currentusers).map((item, idx) => (
                  <>
                  <div>
                    
                    <ProgressBar
                      key={idx}
                      bgcolor={item.bgcolor}
                      completed={item.completed}
                      width={item.width}
                    />
                    <p>Можете пообщаться насчет подарка в этой группе в Телеграм</p>
                    <a href={progress.telegram}>Группа в Телеграме</a>
                    </div>
                    </>
                    // )) : dispatch(deleteProgressbar(progress?.id)) 
                ))}
                   <Button onClick={() => dispatch(joinGroup(el.id, user_id))}>Подарить группой(вступить в группу)</Button>
                </div>
                 : <h5>Забронировано</h5> 
                     : '')
            : ''}
            </> 
     }
        </div>
       </li>)) : ''}

      <ModalInfo/>
    </>
    
  )
}
