import Wish from './Wish/Wish';
import style from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { delWish, isGiven } from '../../redux/actions/wishAC';
import Modal from '../Modal/Modal';

function WishList({ wishlist }) {
  const dispatch = useDispatch();

  const wishes = useSelector((state) => state.wishes?.Wishlist?.Wishes);

  const [modalActive, setActive] = useState(false);
  const [modalValue, setModalValue] = useState({});

  function deleteAction(id) {
    dispatch(delWish(id));
    setModalValue({});
  }

  return (
    <div className="wishes">
      <div className={style['add_wish_btn']}>
        <button
          className={`${style.btn} ${style.second}`}
          onClick={() => (setActive(true), setModalValue(''))}
        >
          Добавить хотелку
        </button>
      </div>
      <div className={style['wish_wrapper']}>
        {wishes
          ?.sort((a, b) => b.id - a.id)
          .map((wish) =>
            !wish.isGiven ? (
              <Wish
                key={wish.id}
                title={wish.title}
                description={wish.description}
                isBinded={wish.isBinded}
                setActive={setActive}
                wishPhoto={wish.WishPhoto?.image}
              >
                <div className={style['btns']}>
                  <button
                    onClick={() => (setActive(true), setModalValue(wish))}
                  >
                    Изменить
                  </button>
                  <button onClick={() => deleteAction(wish.id)}>Удалить</button>
                  <button onClick={() => dispatch(isGiven(wish.id))}>
                    Подарили!
                  </button>
                </div>
              </Wish>
            ) : null
          )}
        <Modal
          wishValue={modalValue}
          setModalValue={setModalValue}
          active={modalActive}
          setActive={setActive}
        />
      </div>
    </div>
  );
}

export default WishList;
