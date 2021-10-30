import Wish from "./Wish/Wish";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllWishes } from "../../redux/actions/wishAC";
import Modal from "../Modal/Modal";

function WishList() {

  const dispatch = useDispatch()

  const wishes = useSelector((state) => state.wishes);

  const [modalActive, setActive] = useState(true)

  console.log(wishes, 'THIS IS WISHEEEEESSSS');

  useEffect(() => dispatch(getAllWishes()), [])

  return (
    <div className='wish_item'>
    <button onClick={() => setActive(true)} className="add_wish_btn">Добавить хотелку</button>
      {
        wishes?.map((wish) => 
        <Wish 
           key={wish.id}
           img={wish.photo}
           title={wish.title}
           description={wish.description}
           bind={wish.bind}
           setActive={setActive}
       />)
      }
      <Modal active={modalActive} setActive={setActive}/>
       
    </div>
  )
    }


export default WishList
