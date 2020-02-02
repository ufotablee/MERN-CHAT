import React from 'react';
import {Empty, Spin, Modal } from 'antd'
import { Message } from 'components'
import classNames from 'classnames'
import './messages.scss'


const Messages = ({
  blockRef,
  isLoading,
  items, 
  user,
  onRemoveMessage, 
  blockHeight,
  previewImage,
  setPreviewImage,
  setIsVisiable,
  isVisiable
}) => {
  
   return (
    <div className="chat__dialog-messages" style={{ height: `calc(100% - ${blockHeight}px)` }}>
     <div 
     ref={blockRef} 
     className={classNames('messages', {"messages--loading" : isLoading})}
    >
        {isLoading  ? (
          <Spin tip="Loading..." size="large">
          
        </Spin>
        ) : 
        items && items.length ? (
        items.map((item,index) => (
          <Message 
          isVisiable={isVisiable}
          setIsVisiable={setIsVisiable}
          key={index}
          {...item}
          onRemoveMessage={onRemoveMessage.bind(this, item._id)}
          setPreviewImage={setPreviewImage}
          isMe={user._id === item.user._id}
           /> ))
          ) : 
          (
            <Empty description="Откройте диалог"/>
          )}
           <Modal
           visible={!!previewImage}
           footer={null}
           onCancel={() => setPreviewImage(null)}
            >
          <img src={previewImage} style={{width: '100%'}} alt="prewiew"/>
          </Modal>
     </div>
     </div>
   )
}

export default Messages;