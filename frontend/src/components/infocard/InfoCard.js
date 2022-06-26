import React, { useEffect } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import { useState } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";
import { logout } from "../../actions/AuthAction";

const InfoCard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfilUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfilUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfilUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogout =() =>{
    dispatch(logout())
  } 


  return (
    <div className='InfoCard'>
      <div className='InfoHead'>
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              onClick={() => setModalOpen(true)}
              width='2rem'
              height='1.5rem'
            />
            <ProfileModal data={user} modalOpen={modalOpen} setModalOpen={setModalOpen} />
          </div>
        ) : (" ")}
      </div>
      <div className='Info'>
        <span>
          <b>Status: </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className='Info'>
        <span>
          <b>Lives in: </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>
      <div className='Info'>
        <span>
          <b>Works at: </b>
        </span>
        <span>{profileUser.worksat}</span>
      </div>
      <button className='button logout-button' onClick={handleLogout}>Log Out</button>
    </div>
  );
};  

export default InfoCard;
