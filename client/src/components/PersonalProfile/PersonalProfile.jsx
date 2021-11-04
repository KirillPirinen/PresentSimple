import './PersonalProfile.css';
import Tabs from './Tabs/Tabs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllWishes } from '../../redux/actions/wishAC';

function PersonalProfile() {
  

  const dispatch = useDispatch()

  useEffect(() => dispatch(getAllWishes()), [dispatch])

  const userData = useSelector(state => state.user)


  return (
    <div className="lkdiv container-glass">
      <div className="user_info">
      <div>
        <img
          className="user_pic"
          src="http://localhost:3001/avatars/default123321.png"
          alt="#"
        ></img>
        </div>
        <div className="user_info_body">
          <p>{userData.name}</p>
          <p>{userData.lname}</p>
          <p>{userData.phone}</p>
          <p>{userData.email}</p>
        </div>
      </div>
        <div className="tabs">
          <Tabs />
        </div>
    </div>
  );
}

export default PersonalProfile;


