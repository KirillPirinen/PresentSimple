import style from './styles.module.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addNewWish, editWish } from '../../redux/actions/wishAC';

function Modal({ active, setActive, wishValue, setModalValue }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState();
  console.log(active);
  useEffect(() => {
    setTitle(wishValue.title ? wishValue.title : '');
    setDescription(wishValue.description ? wishValue.description : '');
    setPrice(wishValue.price ? wishValue.price : '');
  }, [wishValue]);

  const submitAction = (e) => {
    if (wishValue.id) {
      e.preventDefault();
      const data = new FormData();
      data.append('photo', photo);
      data.append('title', title);
      data.append('description', description);
      data.append('price', price);
      data.append('id', wishValue.id);
      console.log(wishValue);
      dispatch(editWish(data));
      e.target.photo.value = null;
      setActive(false);
    } else {
      e.preventDefault();
      const data = new FormData();
      data.append('photo', photo);
      data.append('title', title);
      data.append('description', description);
      data.append('price', price);
      dispatch(addNewWish(data));
      e.target.photo.value = null;
      setTitle('');
      setDescription('');
      console.log(wishValue, price, 'WICHVALUE AND PRICE');
      setPrice('');
      setActive(false);
    }
  };

  return (
    <div
      className={active ? style['modal-sanya'] : style['active-sanya']}
      onClick={() => setActive(false)}
    >
      <div className="modal_content-sanya" onClick={(e) => e.stopPropagation()}>
        <form
          enctype="multipart/form-data"
          onSubmit={submitAction}
          className="d-flex flex-column align-items-center"
        >
          <div class="mb-3">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Желаемый подарок"
              value={title}
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Описание/ссылка"
              value={description}
            />
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Примерная стоимость"
            />
            <input
              name="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
              type="file"
              className="form-control"
            />
          </div>
          <button type="submit" class="btn btn-success">
            Готово
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
 