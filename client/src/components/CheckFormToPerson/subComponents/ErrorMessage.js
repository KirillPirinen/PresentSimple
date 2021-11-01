import { useDispatch } from "react-redux"
import { Button } from "reactstrap"
import { infoModalDeactivate } from "../../../redux/actions/modalInfoAC"

export const ErrorMessage = ({children, message}) => {
  const dispatch = useDispatch() 
  return (
  <div class="alert alert-warning" role="alert">
    {message}
    <hr/>
    {children}
  </div>
  )
}
