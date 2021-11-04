import OneSentForm from "./OneSentForm/OneSentForm"
import { useSelector } from "react-redux"

function MySentForms() {

  const forms = useSelector((state) => state.wishes.Forms)

  return (
    <div>
    {
      forms.map((form) => 
      <OneSentForm
        key={form.id}
        name={form.name}
        lname={form.lname}
        isActive={form.isActive}
        id={form.id}
      />

      )
    }
    </div>
  )
}

export default MySentForms
