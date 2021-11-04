import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input} from 'reactstrap';
import { checkEmail } from '../../../../redux/actions/user.ac';
import styles from './styles.module.css';
import ModalInfo from '../../../ModalInfo/ModalInfo';
import {useHistory} from 'react-router-dom';

export default function ModalForgotPassword() {

  const dispatch = useDispatch();
  const history = useHistory();
  
   const [inputEmail, setInputEmail] = useState('')
   const [groupForgotPassword, setGroupForgotPassword] = useState(true)

  const checkEmailHandler = (e) => {
    e.preventDefault()
    if(inputEmail){
      dispatch(checkEmail(inputEmail))
      setInputEmail('');
    }
  }

  return (
    <Modal isOpen={groupForgotPassword}> 
        <ModalHeader className={styles.header}>Восстановление пароля</ModalHeader>
        <ModalBody>
          <Form className={styles["modal_content"]}>
            <Label for="email" style={{color:'black'}}>На твою электронную почту будет отправлено сообщение с ссылкой для восстановления пароля</Label>
  
            <Input 
            id="email"
            type="text"
             name="email"
               placeholder='Адрес эл.почты'
               value={inputEmail}
               onChange={(e) => setInputEmail(e.target.value)}
              >
              </Input>
              </Form>
        </ModalBody>
        <ModalFooter>
          <Button style={{backgroundColor:'rgb(156, 197, 233)'}} onClick={(e) => {checkEmailHandler(e); history.goBack()}}>Подтвердить смену пароля</Button>{' '}
        </ModalFooter>
        <ModalInfo/>
      </Modal>
  );
}
