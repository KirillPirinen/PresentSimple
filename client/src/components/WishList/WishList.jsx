import Wish from "./Wish/Wish";
import './wishliststyle.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllWishes } from "../../redux/actions/wishAC";
import Modal from "../Modal/Modal";

function WishList() {

  const dispatch = useDispatch()

  const wishes = useSelector((state) => state.wishes);

  const [modalActive, setActive] = useState(false)

  useEffect(() => dispatch(getAllWishes()), [])

  return (
    <div className='wishes'>
    <button onClick={() => setActive(true)} className="add_wish_btn">Добавить хотелку</button>
    <div className="wish_wrapper">
      {
        wishes?.map((wish) => 
        <Wish 
           key={wish.id}
           img={wish.photo}
           title={wish.title}
           description={wish.description}
           isBinded={wish.isBinded}
           setActive={setActive}
       />)
      }
      <Modal active={modalActive} setActive={setActive}/>
      </div>
    </div>
  )
    }


export default WishList
