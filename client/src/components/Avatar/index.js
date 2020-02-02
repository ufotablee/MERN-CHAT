import React from "react";

import { generateAvatarFromHash } from "utils/helpers";

import "./avatar.scss";

const Avatar = (props) => {
const { user,isVisiable,setIsVisiable,handleGetUserById, noWay, } = props

  const handleOpenProfile =  (_id) => {
    if(noWay) {
      handleGetUserById(_id)
      setIsVisiable(!isVisiable)
    }
    else {

    }
 }
  if (user.avatar) {
    return (
      <img 
        className="avatar"
        src={user.avatar}
        alt={`Avatar ${user.fullname}`}
        onClick={() => { handleOpenProfile(user.id)}}
      />
    );
  } else {
    const { color, colorLighten } = generateAvatarFromHash(user.id);
    const firstChar = user.fullname[0].toUpperCase();
    return (
      <div onClick={() => { handleOpenProfile(user.id)}}
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`
        }}
        className="avatar avatar--symbol"
      >
        {firstChar}
      </div>
    );
      }
};


export default Avatar;