import { useDispatch, useEffect, useSelector } from "react-redux";
import Wish from "../../WishList/Wish/Wish";
import style from "./styles.module.css"

function MyPresents() {

  const dispatch = useDispatch()

  const wishes = useSelector((state) => state.wishes?.Wishlist?.Wishes);

  return (
    (
      <div className={style['mainwrapper']}>
       <div className={style['wish_wrapper']}>
        {
          wishes?.map((wish) => wish.isGiven ?
          <Wish
             key={wish.id}
             title={wish.title}
             description={wish.description}
             wishPhoto={wish.WishPhoto?.image}>
          </Wish> : null
         
         )
         
        }
        </div>
      </div>
    )
  )
}

export default MyPresents
