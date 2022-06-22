import React from "react";
import ProfileImg from "../../img/profileImg.jpg";
import "./PostShare.css";
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes
} from "@iconscout/react-unicons";
import { useState } from "react";
import { useRef } from "react";

const PostShare = () => {
  const [image,setImage]= useState(null);
  const imgRef= useRef();

  const onImageChange= (event)=>{
    if (event.target.files && event.target.files[0]){
      let img=event.target.files[0];
        setImage({
          image: URL.createObjectURL(img)
        })
    }
  }

  return (
    <div className='PostShare'>
      <img src={ProfileImg} alt='' />
      <div>
        <input type='text' placeholder="What's happening" />
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
          <button className="button ps-button">Share</button>
          <div style={{display:"none"}}>
            <input type="file" name="myImage" ref={imgRef} onChange={onImageChange}/>
          </div>
        </div>
        {image && 
        <div className="previewImage">
          <UilTimes onClick={()=> setImage(null)}/>
          <img src={image.image}/>
        </div>
        }
      </div>
    </div>
  );
};

export default PostShare;
