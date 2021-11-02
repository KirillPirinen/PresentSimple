import Wish from '../Wish/Wish';
import {Button} from 'reactstrap';
import { useHistory, useParams } from 'react-router';
import { donateToYourself, joinGroup } from '../../../redux/actions/groupModal';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../../main/Progrssbar/Progrssbar';
import { useEffect } from 'react';
import { getWishesPersonWatchPeople } from '../../../redux/actions/groupModal';

export default function WishListPerson() {

  const { id } = useParams()
  const wishesGroupAlone = useSelector(state => state.wishesGroupAlone);

  useEffect(() => {
     dispatch(getWishesPersonWatchPeople(id))
  }, [])

  const dispatch = useDispatch()
  const history = useHistory()

  const groups = useSelector(state => state.groups);

  const user = useSelector(state => state.user);

  
  const groupData = (el) => [{ bgcolor: "#6a1b9a", completed: el.currentusers, width: el.maxusers }];

  return (

    <>
    {wishesGroupAlone ?
    (wishesGroupAlone?.map(el =>
      <li key={el.id}><Wish photo={el.photo} title={el.title} description={el.description} isBinded={el.isBinded} />
     
     {el.isBinded ? 
       <h5>Забронировано</h5>  : 
            <>
            <Button onClick={() => dispatch(donateToYourself(el.id, user.id))}>Подарить самому</Button>

             {!groups ?
                  groups?.map(group => group.wish_id === el.id ?  
                  <Button onClick={() => history.push(`/modalGroupJoin/${el.id}`)}>Подарить группой(вступить в группу)</Button> 
                  : 
                  <Button onClick={() => history.push(`/modalGroup/${el.id}`)}>Подарить группой(создать группу)</Button> 
                  )
                    : ''}
            </> 
     }
       </li>)) : ''}

    </>

  

      
    // {groupData(el).map((item, idx) => (
    //   <ProgressBar
    //     key={idx}
    //     bgcolor={item.bgcolor}
    //     completed={item.completed}
    //     width={item.width}
    //   />)}
    //   <Button onClick={() => dispatch(joinGroup(el.id))}>Подарить группой(вступить в группу)</Button>
    //   <p>Можете пообщаться насчет подарка в этой группе в Телеграм</p>
    //   <a href={group?.group?.telegram}>Группа в Телеграме</a>
    // </>
   // }
    
  )
}
