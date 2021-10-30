import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { CheckUUID } from "../../redux/actions/SentForm.ac"
import { useSentFormContext } from "../context/SentFormContext"
import { SentForm } from "./SentForm"


export const SentFormCheker = () => {
  const {setRanges} = useSentFormContext()
  const {uuid} = useParams()
  const dispatch = useDispatch()
  const {status, data, message} = useSelector(state => state.sentForm)
  useEffect(()=>{
    setRanges(data)
  },[data])
  useEffect(() => 
    dispatch(CheckUUID(uuid))
  ,[dispatch])

  return status ? <SentForm/> : <h1>Error:{message}</h1>;
}
