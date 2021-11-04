import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {Form, Label, Input, Button} from "reactstrap";
import { SendForm } from "../../redux/actions/SentForm.ac";
import { useSentFormContext } from "../context/SentFormContext";
import { PriceRange } from "./PriceRange/PriceRange";

export const SentForm = ({guest}) => {
  const { data } = useSentFormContext()
  const dispatch = useDispatch()
  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(SendForm(guest.id, data, history))
  }
  
  return (
    <div className="container-glass">
    <h2>Привет, {guest?.name} {guest?.lname}!</h2>
    <h3>Заполни пожалуйста анкету, чтобы твои друзья знали что тебе подарить</h3>
    <Form onSubmit={submitHandler} className="d-flex flex-column flex-wrap">
    <Label for="exampleEmail">Твой Email</Label>
    <Input id="exampleEmail" name="email" placeholder={guest?.email} type="email" disabled/>
    <Label for="Phone">Твой телефон:</Label>
    <Input id="Phone" name="phone" placeholder={guest?.phone} type="phone" disabled/>
      {data?.map(range => <PriceRange key={range.id} range={range} />)}
    <hr/>
  <Button type="submit" color="success" className="btn-lg btn-block">
    Отправить форму
  </Button>
</Form>
</div>
  )
}
