import React from 'react';
import { Avatar as BaseAvatar } from 'components'
import { userActions } from 'redux/actions'
import { connect } from 'react-redux'


const Avatar = ({getUserById,isVisiable,setIsVisiable,user,noWay,}) => {
    
    const handleGetUserById = (_id) => {
        getUserById(_id) 
       }

    return (
        <BaseAvatar 
        isVisiable={isVisiable}
        setIsVisiable={setIsVisiable}
        handleGetUserById={handleGetUserById}
        user={user}
        noWay={noWay}
       
        />
    )
}



export default connect(({dialogs}) => {
   return dialogs
},userActions)(Avatar)