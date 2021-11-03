import { Button } from "reactstrap";
export const PresentList = ({presents, clickHandler}) => {
return (
  <ul class="list-group">
          {presents?.map(present=> {
            if(present.isBinded) {
              return <li key={present.id} class="list-group-item disabled">
                Название: <b>{present.title}</b>&nbsp;
                Описание: <b>{present.description ? present.description : 'Детальное описание не добавлено'}</b>
                <p>Подарок кем-то забронирован</p>
                </li>
            } else {
              return <li key={present.id} class="list-group-item">
              Название: <b>{present.title}</b>&nbsp;
              Описание: <b>{present.description ? present.description : 'Детальное описание не добавлено'}</b>
              <p><Button onClick={() => clickHandler(present.id)} color="success" outline>Подарить</Button></p>
              </li>
            }
          })}
      </ul>
)
}
