import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { bindPresent, getAllPresents } from "../../redux/actions/presents.ac";
import ModalInfo from "../ModalInfo/ModalInfo";
import moment from 'moment';
import { PriceRangeBlock } from "./subComponents/PriceRangeBlock";
import { setContacts } from "../../redux/actions/checkFormToPerson";


export const FormRoot = () => {
  const {uuid} = useParams();
  const dispatch = useDispatch();
  const ranges = useSelector(state => state.presents)
  const history = useHistory()
  useEffect(() => {
    dispatch(getAllPresents(uuid))
  }, [dispatch])

  let contacts;
  if(ranges) contacts = ranges[0]?.Presents[0].Form;

  const clickHandler = (present_id) => {
    dispatch(bindPresent(uuid, present_id))
  }
  const newFormHandler = () => {
    dispatch(setContacts(contacts))
    history.push('/search')
  }

  return (
    <>
    {ranges.length &&
    <div className="container-glass">
      <h3>Анкета пользователя: {ranges[0]?.Presents[0].Form.name} {ranges[0].Presents[0].Form.lname}</h3>
      <h4>Дата заполнения: {moment(ranges[0].Presents[0].Form.createdAt).format('LLLL')}</h4>
      <hr/>
      {ranges?.map(el => <PriceRangeBlock key={el.id} range={el} clickHandler={clickHandler}/>)}
      <hr/>
      <button onClick={newFormHandler} color="success" outline>Ничего не нашлось? Отправить ещё одну анкету</button>
    </div>
      }
    <ModalInfo/>
    </>
  )
}
//{ranges[0]?.Presents[0].Form.name} {ranges[0].Presents[0].Form.lname}
//{moment(ranges[0].Presents[0].Form.createdAt).format('LLLL')
