import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { CheckUUID } from "../../redux/actions/SentForm.ac"
import Loader from "../Loader/Loader"
import { SentForm } from "./SentForm"


export const SentFormCheker = () => {

  const {uuid} = useParams()
  const dispatch = useDispatch()
  const {status, message, guest, error} = useSelector(state => state.sentForm)
  const loader = useSelector(state=>state.loader)
  useEffect(() =>
    dispatch(CheckUUID(uuid))
  ,[dispatch])

  return (
    <>
      {loader ? <Loader/> : 
      status ? <SentForm guest = {guest} /> : 
      error ? <h1>Error:{message}</h1> : 
      <h1>{message}</h1>}
    </>
    )
}
