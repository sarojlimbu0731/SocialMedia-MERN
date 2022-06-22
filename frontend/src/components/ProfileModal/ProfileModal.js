import  {Modal} from "@mantine/core";
import './ProfileModal.css';


function ProfileModal({modalOpen,setModalOpen}) {
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
            />
            <input
              type='text'
              className='infoInput'
              name='lastname'
              placeholder='Last Name'
            />
          </div>
          <div>
            <input
              type='text'
              className='infoInput'
              name='workat'
              placeholder='Work At'
            />
          </div>
          <div>
            <input
              type='text'
              className='infoInput'
              name='livesin'
              placeholder='Lives In'
            />
            <input
              type='text'
              className='infoInput'
              name='country'
              placeholder='Country'
            />
          </div>
          <div>
            <input
              type='text'
              className='infoInput'
              name='relationship'
              placeholder='Relationship Status'
            />
          </div>
          <div>
            <input
              type='file'
              className='infoInput'
              name='profileimg'
              placeholder='Profile Image'
            />
            <input
              type='text'
              className='infoInput'
              name='coverimg'
              placeholder='Cover Image'
            />
          </div>
          <button className="button logout-button">Update</button>
        </form>
      </Modal>
    </>
  );
}



export default ProfileModal;