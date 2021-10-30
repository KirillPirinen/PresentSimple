import { Link } from 'react-router-dom';
import './PersonalProfile.css';

function PersonalProfile() {
  return (
    <div className="user_info">
      <img
        className="user_pic"
        src="https://s6.vcdn.biz/static/f/2315815251/image.jpg"
        alt="#"
      ></img>
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

      <div className="wish_buttons">
        <div>
          <Link to="/mywishlist">
            <button className="persbtn" color="primary">Мои хотелки</button>
          </Link>
        </div>
        <div>
          <Link to="/mypresents">
            <button className="persbtn" color="primary">Мне подарили</button>
          </Link>
        </div>
        <div>
          <Link to="/forms">
            <button className="persbtn" color="primary">Анкеты</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PersonalProfile;
