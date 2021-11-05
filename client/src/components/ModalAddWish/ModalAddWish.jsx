import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Input} from 'reactstrap';
import styles from './styles.module.css';
import { addNewWish, editWish } from '../../redux/actions/wishAC';

export default function ModalAddWish({ active, setActive, wishValue }) {

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

  console.log(active, 'MODAL STATUS');

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
      e.target.photo = null;
      setActive(false);
    } else {
      e.preventDefault();
      const data = new FormData();
      data.append('photo', photo);
      data.append('title', title);
      data.append('description', description);
      data.append('price', price);
      dispatch(addNewWish(data));
      e.target.photo = null;
      setTitle('');
      setDescription('');
      console.log(wishValue, price, 'WICHVALUE AND PRICE');
      setPrice('');
      setActive(false);
    }
  };



  return (
    <Modal isOpen={active} toggle={() => setActive(false)}> 
    <ModalHeader className={styles.header}>Добавить хотелку</ModalHeader>
    <ModalBody>
          <Form className={styles["modal_content"]} onSubmit={submitAction}>
            <Input 
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Желаемый подарок"
              value={title}
              >
              </Input>

              <Input 
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Описание/ссылка"
              value={description}
              >
              </Input>

              <Input
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Примерная стоимость"
              >
            </Input>
            <Input
              name="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
              type="file"
              className="form-control"
              >
               </Input>
            </Form>
       </ModalBody>
        <ModalFooter>
        <button type="submit" class="btn btn-success" onClick={submitAction}>Готово</button>
        </ModalFooter>
      </Modal>
      )
      }

 