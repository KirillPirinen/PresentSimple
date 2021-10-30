import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { CheckUUID } from "../../redux/actions/SentForm.ac"
import { useSentFormContext } from "../context/SentFormContext"
import { SentForm } from "./SentForm"


export const SentFormCheker = () => {
  //const {setRanges} = useSentFormContext()
  const {uuid} = useParams()
  const dispatch = useDispatch()
  const sentForm = useSelector(state => state.sentForm)
  
  useEffect(() => 
    dispatch(CheckUUID(uuid))
  ,[dispatch])

  return sentForm.status ? <SentForm/> : <h1>Error:{sentForm.message}</h1>;
}
