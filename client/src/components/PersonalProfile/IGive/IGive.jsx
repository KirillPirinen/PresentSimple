import { useDispatch, useSelector } from "react-redux";
import Wish from "../../WishList/Wish/Wish";
import style from "./styles.module.css"

function IGive() {

  const dispatch = useDispatch()

  const wishes = useSelector((state) => state.wishes?.Wishlist?.Wishes);

  return (
    (
      <div className={style['mainwrapper']}>
       <div className={style['wish_wrapper']}>
        {
          wishes?.map((wish) =>
          <Wish
             key={wish.id}
             title={wish.title}
             description={wish.description}
             wishPhoto={wish.WishPhoto?.image}>
          </Wish>
         
         )
         
        }
        </div>
      </div>
    )
  )
}

export default IGive

