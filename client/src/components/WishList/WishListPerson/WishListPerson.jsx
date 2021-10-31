import Wish from '../Wish/Wish';
import {Button} from 'reactstrap';
import { useHistory } from 'react-router';
import { donateToYourself, joinGroup } from '../../../redux/actions/groupModal';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../../main/Progrssbar/Progrssbar';

export default function WishListPerson() {
  const dispatch = useDispatch()
  const history = useHistory()

  const group = useSelector(state => state.group);
  console.log('group', group)
  const user = useSelector(state => state.user);
  
  // const wish = useSelector(state => state.wish)
  //надо достать id из wish
  const wish = {id: 1, title: 'носки', description: '', isBinded: 'false', user_id: user?.id, pricerange_id: 1, wishlist_id: user?.id}

  const groupData = [
    { bgcolor: "#6a1b9a", completed: group?.group?.currentusers, width: group?.group?.maxusers },
  ];

  return (
    <>
    <Wish/>
    {/* /* !group?.wish && */ }
    { !group?.group ? 
    <>
    <Button onClick={() => dispatch(donateToYourself(wish.id))}>Подарить самому</Button>
    <Button onClick={() => {history.push('/modalGroup')}}>Подарить группой(создать группу)</Button>
    </>
    : ''}

    {group?.wish ? 
    <h2>Забронировано</h2> : ''}
    
    {group?.group ? 
    <>
    {groupData.map((item, idx) => (
      <ProgressBar
        key={idx}
        bgcolor={item.bgcolor}
        completed={item.completed}
        width={item.width}
      />
    ))}

    <Button onClick={() => dispatch(joinGroup(wish.id))}>Подарить группой(вступить в группу)</Button>

    <p>Можете пообщаться насчет подарка в этой группе в Телеграм</p>
    <a href={group?.group?.telegram}>Группа в Телеграме</a>
    </> 
    : ''}
    </>
  )
}
