import Wish from '../Wish/Wish';
import {Button} from 'reactstrap';
import { useHistory, useParams } from 'react-router';
import { addAlone, joinGroup } from '../../../redux/actions/groupModal';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../../main/Progrssbar/Progrssbar';
import { useEffect } from 'react';
import { getWishesPersonWatchPeople } from '../../../redux/actions/groupModal';
import { getProgressbar } from '../../../redux/actions/Progressbar.ac';

export default function WishListPerson() {

  const wishesGroupAlone = useSelector(state => state.wishesGroupAlone);

  const progressbar = useSelector(state => state.progressbar) //здесь все группы
  console.log('progressbar', progressbar)

  const {user_id} = useParams()

  useEffect(() => {
     dispatch(getWishesPersonWatchPeople(user_id))
     dispatch(getProgressbar(progressbar))
  }, [])

  const dispatch = useDispatch()
  const history = useHistory()

  const groups = useSelector(state => state.groups);

  console.log('groups', groups)

  
  const progressbarData = (maxusers, currentusers) => [{ bgcolor: "#6a1b9a", completed: currentusers, width: maxusers }];

  return (

    <>
    {wishesGroupAlone ?
    (wishesGroupAlone?.map(el =>
      <li key={el.id}><Wish photo={el.photo} title={el.title} description={el.description} isBinded={el.isBinded} />
     
     {el.isBinded ? 
       <h5>Забронировано</h5>  : 
            <>
            <Button onClick={() => dispatch(addAlone(el.id, user_id))}>Подарить самому</Button>
            <Button onClick={() => history.push(`/modalGroup/${el.id}`)}>Подарить группой(создать группу)</Button> 
            <Button onClick={() => dispatch(joinGroup(el.id))}>Подарить группой(вступить в группу)</Button> 

            {progressbar ?
               progressbar?.map(progress => progress.wish_id === el.id ?
                progressbarData(progress.maxusers, progress.currentusers).map((item, idx) => (
                  <>
                    <ProgressBar
                      key={idx}
                      bgcolor={item.bgcolor}
                      completed={item.completed}
                      width={item.width}
                    />
                    <p>Можете пообщаться насчет подарка в этой группе в Телеграм</p>
                    <a href={progress.telegram}>Группа в Телеграме</a>
                    </>
                    ))
                     : '')
            : ''}
{/* 
             {groups ?
                  groups?.map(group => group.wish_id === el.id ?  
                  <Button onClick={() => dispatch(joinGroup(el.id, user_id))}>Подарить группой(вступить в группу)</Button> 
                  : 
                  <Button onClick={() => history.push(`/modalGroup/${el.id}`)}>Подарить группой(создать группу)</Button> 
                  )
                    : ''} */}
            </> 
     }
       </li>)) : ''}

    </>
    
  )
}
