import { useState } from "react";
import {Label, Input, FormGroup} from "reactstrap";
import { TextAreaDescription } from "./TextAreaDescription";
import styles from "./styles.module.css";
import {DeleteBtn} from "./DeleteBtn";

export const PriceRangeInput = ({id, deleteHandler}) => {
   const [description, setTextarea] = useState(false)
  return (
    <div className={`d-flex flex-column ${styles['present-box']}`}>
      {id > 1 ? <DeleteBtn onClick={()=>deleteHandler(id)}/> : null}
      <FormGroup>
        <Label>Название подарка:
          <Input name="title" placeholder="Название подарка" type="text"/>
        </Label>
      </FormGroup>
      {description ? <TextAreaDescription/> : null}
      <span className="btn btn-info my-2" onClick={() => setTextarea(prev=>!prev)}>{description ? 'Убрать' : "Добавить"} детальное описание</span>
  </div>
  )
}
