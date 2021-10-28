import {Input, FormGroup} from "reactstrap";

export const TextAreaDescription = () => {
  return (
    <FormGroup>
      <Input
        name="description"
        type="textarea"
        placeholder="Описание/Дополнительная информация"
      />
      </FormGroup>
  )
}
