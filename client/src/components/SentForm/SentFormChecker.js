import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { Button } from "reactstrap"
import { infoModalActivate, infoModalDeactivate } from "../../redux/actions/modalInfoAC"
import { CheckUUID } from "../../redux/actions/SentForm.ac"
import { ErrorMessage } from "../CheckFormToPerson/subComponents/ErrorMessage"
import Loader from "../Loader/Loader"
import ModalInfo from "../ModalInfo/ModalInfo"
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
            <Button onClick={clickHandler} color="success">На главную</Button>
          </ErrorMessage>
        }
        {error && 
          <ErrorMessage error={error}>
            <Button onClick={clickHandler} color="success">На главную</Button>
          </ErrorMessage>
        }
      </ModalInfo>
      {loader ? <Loader/> : 
      status ? <SentForm guest = {guest} /> : null}
    </>
    )
}
