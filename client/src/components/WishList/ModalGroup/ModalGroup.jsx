import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input} from 'reactstrap';
import { addGroup, showButtonAddGroup, showButtonAlone, showButtonJoinGroup } from '../../../redux/actions/groupModal';

export default function ModalGroup() {

  const dispatch = useDispatch();
  const history = useHistory();

   const [inputGroup, setInputGroup] = useState({numberPerson: '', linktelegram: ''})
   const [groupModal, setGroupModal] = useState(true)

   const persons = [2,3,4,5,6,7,8,9,10];

   const { wish_id } = useParams()
   const { user_id } = useParams();

  const addGroupHandler = (e) => {
    e.preventDefault()
    if(inputGroup){
      dispatch(addGroup(inputGroup.numberPerson, inputGroup.linktelegram, wish_id, user_id))
      setInputGroup('');
      history.goBack();
    }
  }

  return (
    <Modal isOpen={groupModal}> 
        <ModalHeader style={{color:'black'}}>Стоимость подарка будет разделена между участниками поровну</ModalHeader>
        <ModalBody>
          <Form>
            <Label for="numberPerson" style={{color:'black'}}>Выберите количество участников, с которыми хотели бы купить этот подарок</Label>
              <select 
              id="numberPerson"
              value={inputGroup.numberPerson}
             onChange={(e) => setInputGroup({...inputGroup, numberPerson: e.target.value})}>
               <option disabled value="">Выбор количества человек</option>
                {persons?.map(el => 
                  <option name="person" value={el}>{el}</option>
              )}
            </select>
            <Label for="linktelegram" style={{color:'black'}}>Создайте группу в Телеграме и добавьте ссылку сюда, чтобы вы смогли договориться о покупке подарка</Label>
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
          <Button style={{backgroundColor:'#FBB064'}} onClick={(e) => addGroupHandler(e)}>Добавить</Button>{' '}
          <Button color="secondary" onClick={() => history.goBack()}>Отмена</Button>
        </ModalFooter>
      </Modal>
  );
}
