import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { getAllPresents } from "../../redux/actions/presents.ac";
import ModalInfo from "../ModalInfo/ModalInfo";
import moment from 'moment';
import { Button } from "reactstrap";

export const FormRoot = () => {
  const {uuid} = useParams();
  const dispatch = useDispatch();
  const presents = useSelector(state => state.presents)
  console.log(presents)
  useEffect(() => {
    dispatch(getAllPresents(uuid))
  }, [dispatch])

  return (
    <>
    {presents &&
    <div className="container-glass">
      <h3>Анкета пользователя: {presents[0].Form.name} {presents[0].Form.lname}</h3>
      <h4>Дата заполнения: {moment(presents[0].Form.createdAt).format('LLLL')}</h4>
      <hr/>
      <ul class="list-group">
          {presents?.map(present=> {
            if(present.isBinded) {
              return <li key={present.id} class="list-group-item disabled">
                Название: <b>{present.title}</b>&nbsp;
                Описание: <b>{present.description ? present.description : 'Детальное описание не добавлено'}</b>
                </li>
            } else {
              return <li key={present.id} class="list-group-item">
              Название: <b>{present.title}</b>&nbsp;
              Описание: <b>{present.description ? present.description : 'Детальное описание не добавлено'}</b>
              <p><Button color="success" outline>Подарить</Button></p>
              </li>
            }
          })}
      </ul>
      <ModalInfo/>
    </div>
      }
    </>
  )
}
