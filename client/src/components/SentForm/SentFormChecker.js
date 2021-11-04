import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { infoModalActivate, infoModalDeactivate } from "../../redux/actions/modalInfoAC"
import { CheckUUID } from "../../redux/actions/SentForm.ac"
import Loader from "../Loader/Loader"
import ModalInfo from "../ModalInfo/ModalInfo"
import { ErrorMessage } from "../ModalInfo/subComponents/ErrorMessage"
import { SentForm } from "./SentForm"


export const SentFormCheker = () => {
  const history = useHistory()
  const {uuid} = useParams()
  const dispatch = useDispatch()
  const {status, message, guest, error} = useSelector(state => state.sentForm)
  const loader = useSelector(state=>state.loader)
  useEffect(() =>
    dispatch(CheckUUID(uuid))
  ,[dispatch])

  useEffect(()=>{
    if(error || message) {
      dispatch(infoModalActivate())
    }
  },[error, message])
  const clickHandler = () => {
    dispatch(infoModalDeactivate())
    history.push('/')
  }
  return (
    <>
      <ModalInfo>
        {message && 
          <ErrorMessage message={message}>
            <button onClick={clickHandler} color="success">На главную</button>
          </ErrorMessage>
        }
        {error && 
          <ErrorMessage message={error}>
            <button onClick={clickHandler} color="success">На главную</button>
          </ErrorMessage>
        }
      </ModalInfo>
      {loader ? <Loader/> : 
      status ? <SentForm guest = {guest} /> : null}
    </>
    )
}
