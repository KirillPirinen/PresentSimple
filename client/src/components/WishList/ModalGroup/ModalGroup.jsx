import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input} from 'reactstrap';
import { groupModal, addGroup } from '../../../redux/actions/groupModal';

export default function ModalGroup() {

  const dispatch = useDispatch();
  const history = useHistory();

   const [inputGroup, setInputGroup] = useState({numberPerson: '', linktelegram: ''})

   const persons = [2,3,4,5,6,7,8,9,10];

  // const toggle = () => dispatch(groupModal(false));

  const addGroupHandler = (e) => {
    e.preventDefault()
    if(inputGroup){
      dispatch(addGroup(inputGroup.numberPerson, inputGroup.linktelegram))
      setInputGroup('');
      history.goBack();
    }
  }

  return (
    <div>
      <Modal isOpen={groupModal}> 
        <ModalHeader>Стоимость подарка будет разделена между участниками поровну</ModalHeader>
        <ModalBody>
          <Form>
            <Label for="numberPerson">Выберите количество участников, с которыми хотели бы купить этот подарок</Label>
              <select 
              id="numberPerson"
              value={inputGroup.numberPerson}
             onChange={(e) => setInputGroup({...inputGroup, numberPerson: e.target.value})}>
               <option disabled value="">Выбор количества человек</option>
                {persons?.map(el => 
                  <option name="person" value={el}>{el}</option>
              )}
            </select>
            <Label for="linktelegram">Создайте группу в Телеграме и добавьте ссылку сюда, чтобы вы смогли договориться о покупке подарка</Label>
            <Input 
            id="linktelegram"
            type="text"
             name="linktelegram"
               placeholder='Ссылка на группу в Телеграме'
               value={inputGroup.linktelegram}
               onChange={(e) => setInputGroup({...inputGroup, linktelegram: e.target.value})}
              >
              </Input>
              </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => addGroupHandler(e)}>Добавить</Button>{' '}
          <Button color="secondary" onClick={() => history.goBack()}>Отмена</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
