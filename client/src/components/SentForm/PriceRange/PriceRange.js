import { useState } from "react"
import { useSentFormContext } from "../../context/SentFormContext";
import { PriceRangeInput } from "../PriceRangeInput/PriceRangeInput"
import styles from "./styles.module.css";

export const PriceRange = ({range}) => {
  const {addInput, deleteInput} = useSentFormContext()
  const [counter, setCounter] = useState(range.payload.length)

  const deleteHandler = (inputId) => {
    deleteInput(range.id, inputId)
  }
  
  const clickHandler = () => {
    addInput(range.id, counter)
    setCounter(prev=>prev+1)
  }

  return (
    <div className={
    range.to === 1000 ? styles.easy : 
    range.to === 3000 ? styles.middle : 
    range.to === 5000 ? styles.hard : 
    range.to === 10000 ? styles.superhard :
    range.to === null ? styles.insane :  
    null}>
      <h3>От {range.from} до {range.to ? range.to : '...'} руб.</h3>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {range.payload?.map(el => (
          <PriceRangeInput rangeid={range.id} del={deleteHandler} {...el}/>
        ))}
      </div>
      {range.payload.length <= 5 ? <p><a className={"btn btn-outline-primary"} rangeid={range.id} onClick={clickHandler}>Добавить подарок</a></p> : null}
    </div>
  )
}
