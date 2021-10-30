import './modal.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addNewWish } from '../../redux/actions/wishAC'

function Modal({ active, setActive }) {

  const dispatch = useDispatch();

  const [titleInput, setTitInput] = useState('');
  const [descriptionInput, setDesInput] = useState('');

  const submitAction = (e) => {
    e.preventDefault();
    dispatch(addNewWish({titleInput, descriptionInput}))
    console.log('run AC');
    setActive(false)
  };

  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => setActive(false)}
    > 
    
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <form
          onSubmit={submitAction}
          className="d-flex flex-column align-items-center"
        >
          <div class="mb-3">
            <input
              onChange={(e) => setTitInput(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Желаемый подарок"
            />
            <input
              onChange={(e) => setDesInput(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Описание/ссылка"
            />
            <input
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
