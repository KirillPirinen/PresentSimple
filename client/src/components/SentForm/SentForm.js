import {Form, Label, Input, Button} from "reactstrap";
import { useSentFormContext } from "../context/SentFormContext";
import { PriceRange } from "./PriceRange/PriceRange";

export const SentForm = ({guest}) => {
  const {data} = useSentFormContext()

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data)
  }
  return (
    <div className="container">
    <h1>Привет, {guest.name}, {guest.lname}!</h1>
    <h3>Заполни пожалуйста анкету, чтобы твои друзья не ломали голову над подарком</h3>
    <Form onSubmit={submitHandler}>
    <Label for="exampleEmail">Твой Email</Label>
    <Input id="exampleEmail" name="email" placeholder={guest.email} type="email" disabled/>
    <Label for="Phone">Твой телефон:</Label>
    <Input id="Phone" name="phone" placeholder={guest.phone} type="phone" disabled/>

      {data?.map(range => <PriceRange key={range.id} range={range} />)}

  <Button>
    Submit
  </Button>
</Form>
</div>
  )
}
