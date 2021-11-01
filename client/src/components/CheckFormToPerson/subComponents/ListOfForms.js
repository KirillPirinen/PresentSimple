export const ListOfForms = ({forms}) => {
  return (
    <>
    <h2>Хорошая новость! Пользователь уже заполнял анкету.</h2>
    <ul>
      {forms.map(e=> <li>f{e.id}</li>)}
    </ul>
    </>
  )
}
