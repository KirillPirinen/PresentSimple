import { PresentList } from "./PresentsList";
import styles from "./styles.module.css";

export const PriceRangeBlock = ({range, clickHandler}) => {
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
        {range.Presents && 
        <PresentList clickHandler={clickHandler} presents={range.Presents}/>
        }
      </div>
    </div>
  )
}
