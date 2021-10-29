import { useState } from "react";
import {Label, Input} from "reactstrap";
import { TextAreaDescription } from "./TextAreaDescription";
import styles from "./styles.module.css";
import {DeleteBtn} from "./DeleteBtn";
import { useSentFormContext } from "../../context/SentFormContext";

export const PriceRangeInput = ({id, del, rangeid}) => {
   const [description, setTextarea] = useState(false)
   const {changeHandler} = useSentFormContext()
   const changeActivator = (e) => changeHandler(e, rangeid, id)
  return (
    <div className={`d-flex flex-column ${styles['present-box']}`}>
      {id > 0 ? <DeleteBtn del={() => del(id)}/> : null}
        <Label>Название подарка:
          <Input onChange={changeActivator} name="title" placeholder="Название подарка" type="text" />
        </Label>
      {description ? <TextAreaDescription handler={changeActivator}/> : null}
      <span  className="btn btn-info my-2" onClick={() => setTextarea(prev=>!prev)}>{description ? 'Убрать' : "Добавить"} детальное описание</span>
  </div>
  )
}
