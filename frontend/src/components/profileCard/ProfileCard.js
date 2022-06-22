import React from 'react';
import Cover from '../../img/cover.jpg';
import ProfileImg from '../../img/profileImg.jpg';
import './ProfileCard.css'

const ProfileCard = () => {

  const ProfilePage= true;

  return (
    <div className='ProfileCard'>
      <div className='ProfileImages'>
        <img src={Cover} alt='' />
        <img src={ProfileImg} alt='' />
      </div>
      <div className='ProfileName'>
        <span>aliza ley</span>
        <span>senior ui/ux designer</span>
      </div>
      <div className='followStatus'>
        <hr />
        <div>
          <div className='follow'>
            <span>7632</span>
            <span>follower</span>
          </div>
          <div className='vl'></div>
          <div className='follow'>
            <span>7</span>
            <span>following</span>
          </div>
          {ProfilePage && (
            <>
              <div className='vl'></div>
              <div className='follow'>
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? "" : <span>My Profile</span>}
    </div>
  );
}

export default ProfileCard;