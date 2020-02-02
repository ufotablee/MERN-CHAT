import React, {useState} from 'react';
import { Profile as BaseProfile } from 'components'
import { userActions } from 'redux/actions'
import { connect } from 'react-redux'


const Profile = (props) => {
    const { userData,userId,setUserAvatar,dialogs,isVisiable,setIsVisiable } = props
    const [isEdit, setIsEdit] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
        const uploadAvatar = (file) => {
            if(userData) {
                setUserAvatar(file,userData._id,)
            }
        }
    return (
        <BaseProfile
        userData={userData}
        uploadAvatar={uploadAvatar}
        userId={userId}
        isEdit={isEdit}
        isVisiable={isVisiable}
        setIsVisiable={setIsVisiable}
        setIsEdit={setIsEdit}
        setPreviewImage={setPreviewImage}
        previewImage={previewImage}
        currentDialogId={dialogs}
        />
    )
}
export default connect(({user,dialogs}) => ({
    userData: user.userData,
    dialogs: dialogs.currentDialogId,
    userId: user.data._id
}),userActions)(Profile)