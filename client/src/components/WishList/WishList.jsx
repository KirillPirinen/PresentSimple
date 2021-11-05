import Wish from "./Wish/Wish";
import style from './styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { delWish, isGiven } from "../../redux/actions/wishAC";
import ModalAddWish from "../ModalAddWish/ModalAddWish";

function WishList({wishlist}) {

  const dispatch = useDispatch()

  const wishes = useSelector((state) => state.wishes?.Wishlist?.Wishes);

  const [modalActive, setActive] = useState(false)
  const [modalValue, setModalValue] = useState({})

  function deleteAction(id) {
    dispatch(delWish(id))
    console.log(modalValue);
    setModalValue({})
  }


  return (
    <div className='wishes container-glass'>
    <div className={style['add_wish_btn']}>
    <button onClick={() => (setActive(true),setModalValue(''))} >Добавить хотелку</button>
    </div>
    <div className={style['wish_wrapper']}>
      {
        wishes?.map((wish) => !wish.isGiven ?
        <Wish
           key={wish.id}
           title={wish.title}
           description={wish.description}
           isBinded={wish.isBinded}
           setActive={setActive}
           wishPhoto={wish.WishPhoto?.image}>
           <div className={style['btns']}>
           <button onClick={() => (
             setActive(true),
             setModalValue(wish)
           )}>Изменить</button>
           <button onClick={() => deleteAction(wish.id)} >Удалить</button>
           <button onClick={() => dispatch(isGiven(wish.id))}>Подарили!</button>
           </div>
           </Wish> : null
       
       )
       
      }
      <ModalAddWish wishValue={modalValue} setModalValue={setModalValue} active={modalActive} setActive={setActive} />
      </div>
    </div>
  )
    }


export default WishList
