import Wish from '../Wish/Wish';
import {Button} from 'reactstrap';
import { useHistory, useParams } from 'react-router';
import { addAlone, joinGroup, showButtonAddGroup } from '../../../redux/actions/groupModal';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../../main/Progrssbar/Progrssbar';
import { useEffect, useState } from 'react';
import { getWishesPersonWatchPeople } from '../../../redux/actions/groupModal';
import { getProgressbar, deleteProgressbar } from '../../../redux/actions/Progressbar.ac';
import ModalInfo from '../../ModalInfo/ModalInfo';

export default function WishListPerson() {

  const wishesGroupAlone = useSelector(state => state.wishesGroupAlone);

  const progressbar = useSelector(state => state.progressbar) //здесь все группы

  const {user_id} = useParams()

  useEffect(() => {
     dispatch(getWishesPersonWatchPeople(user_id))
     dispatch(getProgressbar(progressbar))
  }, [])

  const dispatch = useDispatch()
  const history = useHistory()

  const buttonsAlone = useSelector(state => state.buttonsAlone)
  const buttonsAddGroup = useSelector(state => state.buttonsAddGroup);
  const buttonsJoinGroup = useSelector(state => state.buttonsJoinGroup);

  
  const progressbarData = (maxusers, currentusers) => [{ bgcolor: "#6a1b9a", completed: currentusers, width: maxusers }];

  return (

    <>
    {wishesGroupAlone ?
    (wishesGroupAlone?.map(el =>
      <li key={el.id}>
        <div style={{display:'flex'}}>
        <Wish photo={el.photo} title={el.title} description={el.description} isBinded={el.isBinded} />
     
     {el.isBinded ? 
       <h5>Забронировано</h5>  : 
            <>
            <div>
            {/* {buttonsAlone ? */}
            <Button onClick={() => dispatch(addAlone(el.id, user_id))}>Подарить самому</Button>
             {/* {buttonsAddGroup ? */}
            <Button onClick={() => history.push(`/modalGroup/${el.id}`)}>Подарить группой(создать группу)</Button>
               </div>
            {progressbar ?
               progressbar?.map(progress => progress.wish_id === el.id ?
                progress.maxusers !== progress.currentusers ?
                progressbarData(progress.maxusers, progress.currentusers).map((item, idx) => (
                  <>
                  <div>
                  <Button onClick={() => {dispatch(joinGroup(el.id, user_id)); dispatch(showButtonAddGroup(false))}}>Подарить группой(вступить в группу)</Button> 
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
                    )) : dispatch(deleteProgressbar(progress.id))
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
