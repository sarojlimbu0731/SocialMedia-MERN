import React, { useEffect } from 'react';
import './Posts.css';
import Post from '../Post/Post';
import {useDispatch, useSelector} from "react-redux"
import { getTimelinePost } from '../../actions/postAction';

const Posts = () => {
  const dispatch = useDispatch()
  const {user} =useSelector((state)=>state.authReducer.authData)
  const {posts,loading}= useSelector((state)=>state.postReducer)

  useEffect( ()=>{
    dispatch(getTimelinePost(user._id))
  },[dispatch, user])
console.log(posts)
    return (
      <div className='Posts'>
        {
          loading ?"Fetching Post...": posts.map((post) => <Post data={post} />
        )}
      </div>
    );
}

export default Posts;