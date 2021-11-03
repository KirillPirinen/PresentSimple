import { Link } from 'react-router-dom';
import WishList from '../WishList/WishList';
import './PersonalProfile.css';
import Tabs from './Tabs/Tabs';

function PersonalProfile() {
  return (
    <div className="lkdiv container-glass">
      <div className="user_info">
      <div>
        <img
          className="user_pic"
          src="https://s6.vcdn.biz/static/f/2315815251/image.jpg"
          alt="#"
        ></img>
        </div>
        <div className="user_info_body">
          <p>Michael</p>
          <p>Jackson</p>
          <p>999 999 99 99</p>
          <p>michael@jackson.com</p>
          {/* {user.name}
          {user.lname}
          {user.phone}
          {user.email} */}
        </div>
      </div>
        <div className="tabs">
          <Tabs />
        </div>
    </div>
  );
}

export default PersonalProfile;

// <div className="wish_buttons">
//   <div>
//     <Link to="/mywishlist">
//       <button className="persbtn" color="primary">Мои хотелки</button>
//     </Link>
//   </div>
//   <div>
//     <Link to="/mypresents">
//       <button className="persbtn" color="primary">Мне подарили</button>
//     </Link>
//   </div>
//   <div>
//     <Link to="/forms">
//       <button className="persbtn" color="primary">Анкеты</button>
//     </Link>
//   </div>
// </div>
