import { useState } from "react"
import { PriceRangeInput } from "../PriceRangeInput/PriceRangeInput"
import styles from "./styles.module.css";

export const PriceRange = ({range}) => {
  let inputCounter = 1
  const [inputs, setInputs] = useState([<PriceRangeInput key={inputCounter} id={inputCounter} deleteHandler={deleteHandler}/>])
  const clickHandler = () => {
    inputCounter++
    setInputs(prev => [...prev, <PriceRangeInput key={inputCounter} id={inputCounter}/>])
  }
  const deleteHandler = (boxid) => {

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
        {inputs}
      </div>
      {inputCounter <= 5 ? <p><a className={"btn btn-info"} onClick={clickHandler}>Добавить ещё один подарок</a></p> : null}
    </div>
  )
}
