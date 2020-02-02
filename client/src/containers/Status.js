import React from "react";
import { Status as StatusBase } from "components";
import { connect } from "react-redux";
import { userActions,dialogsActions } from 'redux/actions'

const Status = (props) => {
  const { currentDialogId, user, dialogs,setIsVisiable,isVisiable,getUserById, } = props
  if (!dialogs.length || !currentDialogId) {
    return null;
  }
  
  const currentDialogObj = dialogs.filter(
    dialog => dialog._id === currentDialogId
  )[0];

  let partner = {};
  if(currentDialogObj) {
    if (currentDialogObj.author._id === user._id) {
      partner = currentDialogObj.partner;
    } else {
      partner = currentDialogObj.author;
    }
  }
  
  const handleGetUserById = (_id) => {
    getUserById(_id)
  }
  

  return <StatusBase  handleGetUserById={handleGetUserById} online={partner.isOnline} fullname={partner.fullname} setIsVisiable={setIsVisiable} isVisiable={isVisiable} user={user}/>;
};

export default connect(({ dialogs, user }) => ({
  dialogs: dialogs.items,
  currentDialogId: dialogs.currentDialogId,
  user: user.data,
}),{...userActions,...dialogsActions})(Status);