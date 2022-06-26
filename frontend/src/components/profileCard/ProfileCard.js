import React from 'react';
import { useSelector } from 'react-redux';
// import Cover from '../../img/cover.jpg';
// import ProfileImg from '../../img/profileImg.jpg';
import './ProfileCard.css'
import {Link} from "react-router-dom";

const ProfileCard = ({location}) => {
  const {user}= useSelector((state)=>state.authReducer.authData)
  const posts= useSelector( (state)=>state.postReducer.posts)
  console.log("output is 1st ", typeof user )
  console.log(user)
  console.log("output 2nd is", typeof posts)
  console.log(posts)
  const serverPublic =process.env.REACT_APP_PUBLIC_FOLDER


  return (
    <div className='ProfileCard'>
      <div className='ProfileImages'>
        <img
          src={
            user.coverImg
              ? serverPublic + user.coverImg
              : serverPublic + "defaultCover.jpg"
          }
          alt=''
        />
        <img
          src={
            user.ProfileImg
              ? serverPublic + user.ProfileImg
              : serverPublic + "defaultProfile.png"
          }
          alt=''
        />
      </div>
      <div className='ProfileName'>
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.workat ? user.workat : "Write about yourself"}</span>
      </div>
      <div className='followStatus'>
        <hr />
        <div>
          <div className='follow'>
            <span>{user.follower.length}</span>
            <span>follower</span>
          </div>
          <div className='vl'></div>
          <div className='follow'>
            <span>{user.following.length}</span>
            <span>following</span>
          </div>
          {location ==="profilePage" && (
            <>
              <div className='vl'></div>
              <div className='follow'>
                <span>{posts.filter((post)=>post.userId=== user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      { location ==="profilePage" ? (
        ""
      ) : (
        <span>
          <Link style={{textDecoration:"none",color:"inherit"}} to={`/profile/${user._id}`}>My Profile</Link>
        </span>
      )}
    </div>
  );
}

export default ProfileCard;