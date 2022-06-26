import React from "react";
import ProfileImg from "../../img/profileImg.jpg";
import "./PostShare.css";
import {uploadImage, uploadPost} from "../../actions/uploadAction";

import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes
} from "@iconscout/react-unicons";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const PostShare = () => {
  //global state access
  const dispatch = useDispatch();
  const {user}= useSelector((state)=>state.authReducer.authData)
  const loading= useSelector((state)=>state.postReducer.uploading)
  const [image,setImage]= useState(null);
  const imgRef= useRef();
  const desc= useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER


  const onImageChange= (event)=>{
    if (event.target.files && event.target.files[0]){
      let img=event.target.files[0];
        setImage(img)
    }
  };
  const reset=()=>{
    setImage(null);
    desc.current.value=""
  }

  const handleSubmit= (e)=>{
    e.preventDefault();
      const newPost={
        userId:user._id,
        desc: desc.current.value
      }
      if (image){
        const data= new FormData()
        const filename= Date.now() + image.name
        data.append("name",filename)
        data.append("file", image);
        newPost.image=filename
        // console.log(newPost)
        try {
          dispatch(uploadImage(data))
          
        } catch (error) {
          console.log(error)
        }
      };

      dispatch(uploadPost(newPost))
      reset()
  }

  return (
    <div className='PostShare'>
      <img src={user.ProfileImg ? serverPublic + user.ProfileImg : serverPublic + "defaultProfile.png"} alt='' />
      <div>
        <input type='text' required ref={desc} placeholder="What's happening" />
        <div className='postOptions'>
          <div className='option' style={{ color: "var(--photo)" }} onClick={()=>imgRef.current.click()}>
            <UilScenery />
            Photo
          </div>
          <div className='option' style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className='option' style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className='option' style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button disabled={loading} onClick={handleSubmit} className="button ps-button">{loading ?"Uploading":"Share"}</button>
          <div style={{display:"none"}}>
            <input type="file" name="myImage" ref={imgRef} onChange={onImageChange}/>
          </div>
        </div>
        {image && 
        <div className="previewImage">
          <UilTimes onClick={()=> setImage(null)}/>
          <img src={URL.createObjectURL(image)} alt=" " />
        </div>
        }
      </div>
    </div>
  );
};

export default PostShare;
