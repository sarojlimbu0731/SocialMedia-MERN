import React, { useState } from 'react';
import './Post.css';
import Like from '../../img/like.png';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import NotLike from "../../img/notlike.png";
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';

const Post = ({data}) => {

  const {user}= useSelector((state)=>state.authReducer.authData)


  const [likes, setLikes] = useState(data.likes.length);
  const [liked, setLiked]= useState(data.likes.includes(user._id));


  const handleLike=()=>{
    setLiked((prev)=> !prev)
    likePost(data._id, user._id)
    liked? setLikes((prev)=>prev-1):setLikes((prev)=>prev+1)
  }

  return (
    <div className='Post'>
      <span>
        <strong>{data.desc}</strong>
      </span>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt={`person`}
      />
      <div className='postReact'>
        <img
          src={liked ? Like : NotLike}
          alt=''
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt='' />
        <img src={Share} alt='' />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "14px" }}>
        {likes} Likes
      </span>
      <div className='details'>
        <span>
          <strong>{data.name}</strong>
        </span>
      </div>
    </div>
  );
}

export default Post;