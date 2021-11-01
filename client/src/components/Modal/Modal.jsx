import './modal.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addNewWish } from '../../redux/actions/wishAC'

function Modal({ active, setActive }) {

  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prise, setPrice] = useState('')
  const [photo, setPhoto] = useState()

  const submitAction = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('photo', photo)
    dispatch(addNewWish({title, description, prise, photo}))
    setActive(false)
  };

  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => setActive(false)}
    > 
    
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
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
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Описание/ссылка"
            />
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Примерная стоимость"
            />
            <input
            name="photo"
            onChange={(e) => setPhoto(e.target.value)}
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
