import React from 'react';
import "./InfoCard.css";
import {UilPen} from '@iconscout/react-unicons';
import { useState } from 'react';
import ProfileModal from '../ProfileModal/ProfileModal';


const InfoCard = () => {
  const [modalOpen,setModalOpen]= useState(false);


  return (
    <div className='InfoCard'>
      <div className='InfoHead'>
        <h4>Your Info</h4>
        <div>
          <UilPen
            onClick={() => setModalOpen(true)}
            width='2rem'
            height='1.5rem'
          />
          <ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen}/> 
        </div>
      </div>
      <div className='Info'>
        <span>
          <b>Status: </b>
        </span>
        <span>In Relationship</span>
      </div>
      <div className='Info'>
        <span>
          <b>Lives in: </b>
        </span>
        <span>Kathmandu</span>
      </div>
      <div className='Info'>
        <span>
          <b>Works at: </b>
        </span>
        <span>Coding Academy</span>
      </div>
      <button className='button logout-button'>Log Out</button>
    </div>
  );
}

export default InfoCard;