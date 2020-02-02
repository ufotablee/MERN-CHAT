import React from 'react'
import { Avatar,Edit } from 'containers'
import { getMessageTime } from 'utils/helpers'
import './profile.scss'
import parseISO from 'date-fns/parseISO'
import { Icon, Button,Modal } from 'antd';
import { Link } from 'react-router-dom' 

export default function Profile(props) {
    const { userData,uploadAvatar,userId ,isEdit,setIsEdit,currentDialogId,setIsVisiable, isVisiable, previewImage,setPreviewImage } = props
        return (
            userData !== null  && 
            <>
           <div className="overlay"></div>
           <div className="modal_container">
               <div className="modal_container__main">
                { userId === userData._id && 
                <>
                <Button onClick={ () => { setIsEdit(!isEdit)}}>Редактирование</Button>
            { isEdit && <div className="edit__string">
                    <Edit />
                </div>}
                </>
                }
               {userData.id  &&  
               <div className="modal_container__main-header">
                   <div className="modal_container__main-header-avatar" onClick={() => setPreviewImage(userData.avatar)}>
                    <Avatar user={userData} />
                    </div>
                    <div className="modal_container__main-header-info">
                    <p>{userData.fullname}</p>
                    <p>{ !userData.isOnline ? getMessageTime(parseISO(userData.last_seen)) : 'Online'}</p>
                    </div>
                    { userId === userData._id ? 
                    (
                    <>
                    <input type="file" id="file" onChange={(e) => uploadAvatar(e.target.files[0])}/>
                    <label htmlFor="file" className="btn-3"><Icon type="camera" /></label> 
                    </>
                    )
                     : 
                     ( <div >
                         <Link to={`/dialog/${currentDialogId}`} onClick={ () => { setIsVisiable(!isVisiable)}}><Icon type="message" style={{ fontSize: '26px', color : 'white'}}/></Link>
                       </div>
                     )}
                </div>}
                <div className="modal_container__main-body">
                    <ul>
                     <li><Icon type="mail" style={{ fontSize: '26px', color: '#08c' }}/> <span>{userData.email}</span></li>
                     <li><Icon type="number" style={{ fontSize: '26px', color: '#08c' }}/><span>{userData.id}</span></li>
                    </ul>
                </div>
               </div>
            </div>
            <Modal
           style={{zIndex: 9999999999}}
           visible={!!previewImage}
           footer={null}
           onCancel={() => setPreviewImage(null)}
            >
          <img src={previewImage} style={{width: '100%'}} alt="prewiew"/>
          </Modal>
            </>
        )
   
}
