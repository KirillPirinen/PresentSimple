import './PersonalProfile.css';
import Tabs from './Tabs/Tabs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllWishes } from '../../redux/actions/wishAC';

function PersonalProfile() {
  

  const dispatch = useDispatch()

  useEffect(() => dispatch(getAllWishes()), [dispatch])

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


