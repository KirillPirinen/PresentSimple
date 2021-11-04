import { useSelector } from "react-redux";
import Wish from "../../WishList/Wish/Wish";
import style from "./styles.module.css"

function IGive() {


  const wishes = useSelector((state) => state.wishes?.Wishes.concat(state.wishes.Presents));
console.log(wishes[1].Form.name, '1112324235234');
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
             wishPhoto={wish.WishPhoto?.image}
             ownerName={wish.Wishlist?.User.name ? wish.Wishlist?.User.name : wish.Form.name}
             ownerLname={wish.Wishlist?.User.lname ? wish.Wishlist?.User.lname : wish.Form.lname }
             >
          </Wish>
         
         )
         
        }
        </div>
      </div>
    )
  )
}

export default IGive

