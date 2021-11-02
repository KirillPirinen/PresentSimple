export const ErrorMessage = ({children, message}) => {
  return (
  <div class="alert alert-warning" role="alert">
    {message}
    <hr/>
    {children}
  </div>
  )
}
