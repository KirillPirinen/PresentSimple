import { useState } from "react"
import { PriceRangeInput } from "../PriceRangeInput/PriceRangeInput"
import styles from "./styles.module.css";

export const PriceRange = ({range}) => {
  const [counter, setCounter] = useState(2)
  const [inputs, setInputs] = useState([{key: range.to, id: 1}])

  const deleteHandler = (inputId) => {
    setInputs(prev => prev.filter(el => el.id !== inputId))
  }
  
  const clickHandler = () => {
    setInputs(prev => [...prev, {key: range.to + counter, id: counter}])
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
        {inputs?.map(el => (
          <PriceRangeInput del={deleteHandler} {...el}/>
        ))}
      </div>
      {inputs.length <= 5 ? <p><a className={"btn btn-info"} onClick={clickHandler}>Добавить ещё один подарок</a></p> : null}
    </div>
  )
}
