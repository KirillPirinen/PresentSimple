import Wish from "./Wish/Wish";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllWishes } from "../../redux/reducers/wishReducer";

function WishList() {

  const dispatch = useDispatch()

  const wishes = useSelector((state) => state.wishes)

  useEffect(() => dispatch(getAllWishes()), [])

  return (
     <div className='wish_item'>
       {
         wishes.map((wish) => 
         <Wish 
         key={wish.id}
         img={wish.photo}
         title={wish.title}
         description={wish.description}
         bind={wish.bind}
         />)
       }
     </div>
  )
}

export default WishList
