import { useDispatch, useEffect, useSelector } from "react-redux";
import Wish from "../../WishList/Wish/Wish";

function MyPresents() {
  const dispatch = useDispatch()

  const presents = useSelector((state) => state.wishes.presents)

  return (
    (
      <div className='wishes'>
       <div className={style['wish_wrapper']}>
        {
          wishes?.map((wish) => 
          <Wish
             key={wish.id}
             title={wish.title}
             description={wish.description}
             isBinded={wish.isBinded}
             wishPhoto={wish.WishPhoto?.image}>
          </Wish>
         
         )
         
        }
        </div>
      </div>
    )
  )
}

export default MyPresents
