import {Input} from "reactstrap";

export const TextAreaDescription = ({handler}) => {
  return (
      <Input
        name="description"
        type="textarea"
        placeholder="Описание/Дополнительная информация"
        onChange={handler}
      />
  )
}
