import React from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../trendCard/TrendCard";
import { useState } from "react";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";


const RightSide = () => {
  const [modalOpen,setModalOpen]= useState(false)
  return (
    <div className='RightSide'>
      <div className='navIcons'>
        <Link className="link" to={'/home'}>
          <img src={Home} alt='home' />
        </Link>
        <UilSetting />
        <img src={Noti} alt='notification' />
        <img src={Comment} alt='comment' />
      </div>
      <TrendCard />
      <button onClick={() => setModalOpen(true)} className='button sr-button'>
        Share
      </button>
      <ShareModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default RightSide;
