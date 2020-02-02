import React, { useState } from 'react';

import classNames from 'classnames';
import { Button, Popover } from 'antd';
import { Link } from 'react-router-dom'
import './status.scss'

const Status = (props) => {
  const { online,fullname,setIsVisiable,isVisiable,handleGetUserById,user } = props
  const [btnVisiable, setBtnVisiable] = useState(false)

  const handleVisiable = () => {
    handleGetUserById(user._id)
    setBtnVisiable(!btnVisiable)
    setIsVisiable(!isVisiable)
  }
    return (
    <div className="chat__dialog-header">
    <div className="chat__dialog-header-center">
    <b className="chat__dialog-header-username">{fullname}</b>
      <div className="chat__dialog-header-status">
        <span className={classNames('status', { 'status--online': online })}>
          {online ? 'онлайн' : 'офлайн'}
        </span>
      </div>
    </div>
    <Popover
      visible={btnVisiable}
      onVisibleChange={() => setBtnVisiable(!btnVisiable)}
      className="chat__dialog-header-action"
      content={
        <div>
          <p><Button onClick={handleVisiable}>Профиль</Button></p>
          <br />
          <p><Button><Link to={`/signIn`}>Выйти</Link></Button></p>
          
        </div>
      }
      trigger="click">
      <div>
        <Button type="link" shape="circle" icon="ellipsis" />
      </div>
    </Popover>
  </div>
    )
    }


export default Status;