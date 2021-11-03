import { useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Card, CardTitle, CardText, Button, Container } from 'reactstrap'
import WishList from '../../WishList/WishList'

function Tabs() {

  const [active, setActive] = useState({tab1: 'active', tab2: '', tab3: '', tab4: '', tab5: ''})

  return (

<div>
<Container>
  <Nav tabs>
    <NavItem>
      <NavLink
        className={active.tab1}
        onClick={() => setActive({tab1: 'active', tab2: '', tab3: '', tab4: '', tab5: ''})}
      >
        Мои хотелки
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className={active.tab2}
        onClick={() => setActive({tab1: '', tab2: 'active', tab3: '', tab4: '', tab5: ''})}
      >
        Я дарю
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className={active.tab3}
        onClick={() => setActive({tab1: '', tab2: '', tab3: 'active', tab4: '', tab5: ''})}
      >
        Отправленные анкеты
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className={active.tab4}
        onClick={() => setActive({tab1: '', tab2: '', tab3: '', tab4: 'active', tab5: ''})}
      >
        Мои группы
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className={active.tab5}
        onClick={() => setActive({tab1: '', tab2: '', tab3: '', tab4: '', tab5: 'active'})}
      >
        Мне подарили
      </NavLink>
    </NavItem>
  </Nav>
  
  </Container> 
  {
    active.tab1 === 'active' ? <WishList/> :
    <WishList/>
  }
</div>
  )
}

export default Tabs