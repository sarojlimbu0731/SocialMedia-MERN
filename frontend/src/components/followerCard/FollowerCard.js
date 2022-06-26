import React from 'react';
import './FollowerCard.css';
import { Followers } from '../../data/FollowerData';

const FollowerCard = () => {
  return (
    <div className='FollowerCard'>
        <h3>People you may know</h3>
        {Followers.map( (follower, id)=>{
            return (
              <div className='follower' key={id}>
                <div>
                  <img
                    src={follower.img}
                    alt={follower.name}
                    className='followerImg'
                  />
                  <div className='name'>
                    <span>{follower.name}</span>
                    <span>@{follower.username}</span>
                  </div>
                </div>
                <button className='button fc-button'>Follow</button>
              </div>
            );

        })}

    </div>
  )
}

export default FollowerCard;
