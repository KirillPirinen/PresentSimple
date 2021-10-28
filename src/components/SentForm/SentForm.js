import {Form, FormText, Label, Input, FormGroup, Button} from "reactstrap";
import { PriceRange } from "./PriceRange/PriceRange";

export const SentForm = () => {
  return (
    <div className="container">
    <h1>Привет, Петя!</h1>
    <h3>Заполни пожалуйста анкету, чтобы твои друзья не ломали голову над подарком</h3>
    <Form>
  <FormGroup>
    <Label for="exampleEmail">Твой Email</Label>
    <Input id="exampleEmail" name="email" placeholder="1@mail.ru" type="email" disabled/>
  </FormGroup>
  <FormGroup>
    <Label for="Phone">Твой телефон:</Label>
    <Input id="Phone" name="phone" placeholder="79251231212" type="phone" disabled/>
  </FormGroup>

      <PriceRange range={{from:0, to:1000}}/>
      <PriceRange range={{from:1000, to:3000}}/>
      <PriceRange range={{from:3000, to:5000}}/>
      <PriceRange range={{from:5000, to:10000}}/>
      <PriceRange range={{from:10000, to:null}}/>

  <FormGroup tag="fieldset">
    <FormGroup check>
      <Input
        name="radio1"
        type="radio"
      />
      {' '}
      <Label check>
        Option two can be something else and selecting it will deselect option one
      </Label>
    </FormGroup>
    <FormGroup
      check
      disabled
    >
      <Input
        disabled
        name="radio1"
        type="radio"
      />
      {' '}
      <Label check>
        Option three is disabled
      </Label>
    </FormGroup>
  </FormGroup>
  <FormGroup check>
    <Input type="checkbox" />
    {' '}
    <Label check>
      Check me out
    </Label>
  </FormGroup>
  <Button>
    Submit
  </Button>
</Form>
</div>
  )
}
