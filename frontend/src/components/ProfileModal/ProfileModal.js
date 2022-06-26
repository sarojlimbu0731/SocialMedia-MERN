import  {Modal} from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";
import './ProfileModal.css';


function ProfileModal({modalOpen, setModalOpen, data}) {
  const {password, ...newData}=data;
  const [formData, setFormData]= useState(newData)
  const [profileimg, setProfileimg]= useState(null)
  const [coverimg, setCoverimg]= useState(null)
  const dispatch =useDispatch()
  const params= useParams()
  const {user}= useSelector( (state)=> state.authReducer.authData)

  const handleChange=(e) =>{
    setFormData({...formData, [e.target.name]:e.target.value})
  };

  const onImageChange=(e) =>{
    if (e.target.files && e.target.files[0]){
      const img=e.target.files[0]
      e.target.name=== "profileimg" ?setProfileimg(img):setCoverimg(img)
    }
  };

  const handleSubmit =(e)=>{
    e.preventDefault();
    let  userData =formData
    if (profileimg){
      const data= new FormData();
      const fileName = Date.now() + profileimg.name
      data.append("name", fileName)
      data.append("file",profileimg)
      userData.profileimg= fileName
      try {
        dispatch(uploadImage( data))
      } catch (error) {
        console.log(error)  
      }
    }

        if (coverimg) {
          const data = new FormData();
          const fileName = Date.now() + coverimg.name;
          data.append("name", fileName);
          data.append("file", coverimg);
          userData.profileimg = fileName;
          try {
            dispatch(uploadImage(data));
          } catch (error) {
            console.log(error);
          }
        }
        dispatch(updateUser(params.id, userData))
        setModalOpen(false)
  }

  return (
    <>
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} size='40%'>
        <form className='infoForm'>
          <h3>Your Info</h3>
          <div>
            <input
              type='text'
              className='infoInput'
              name='firstname'
              placeholder='First Name'
              onChange={handleChange}
              value={formData.firstname}
            />
            <input
              type='text'
              className='infoInput'
              name='lastname'
              placeholder='Last Name'
              onChange={handleChange}
              value={formData.lastname}
            />
          </div>
          <div>
            <input
              type='text'
              className='infoInput'
              name='worksat'
              placeholder='Work At'
              onChange={handleChange}
              value={formData.worksat}
            />
          </div>
          <div>
            <input
              type='text'
              className='infoInput'
              name='livesin'
              placeholder='Lives In'
              onChange={handleChange}
              value={formData.livesin}
            />
            <input
              type='text'
              className='infoInput'
              name='country'
              placeholder='Country'
              onChange={handleChange}
              value={formData.country}
            />
          </div>
          <div>
            <input
              type='text'
              className='infoInput'
              name='relationship'
              placeholder='Relationship Status'
              onChange={handleChange}
              value={formData.relationship}
            />
          </div>
          <div>
            <input
              type='file'
              className='infoInput'
              name='profileimg'
              placeholder='Profile Image'
              onChange={onImageChange}
            />
            <input
              type='file'
              className='infoInput'
              name='coverimg'
              placeholder='Cover Image'
              onChange={onImageChange}
            />
          </div>
          <button className='button logout-button' onClick={handleSubmit}>Update</button>
        </form>
      </Modal>
    </>
  );
}



export default ProfileModal;