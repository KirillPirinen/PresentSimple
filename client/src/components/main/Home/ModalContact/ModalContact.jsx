import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input} from 'reactstrap';
import styles from './styles.module.css';
import {useHistory} from 'react-router-dom';

export default function ModalContact() {

   const [modalContact, setModalContact] = useState(true)
   const history = useHistory()

  return (
    <Modal isOpen={modalContact} toggle={() => {setModalContact(false); history.goBack()}}> 
        <ModalHeader className={styles.header}>Наши контакты</ModalHeader>
        <ModalBody>
          <Form className={styles["modal_content"]}>
            <p style={{color:'black'}}>Для любых предложений пишите на электронную почту: presentsimple@internet.ru &#128231;</p>
              </Form>
        </ModalBody>
      </Modal>
  );
}
