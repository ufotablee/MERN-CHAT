import React, {useEffect,useRef,useState} from 'react';
import { Messages as BaseMessages } from 'components'
import { messagesActions } from 'redux/actions'
import { connect } from 'react-redux'
import socket from 'core/socket'
import {Empty } from 'antd'

const Dialogs = ({
    isLoading,
    currentDialogId, 
    fetchMessages, 
    items,
    addMessage,
    user,
    onRemoveMessage,
    attachments,
    isVisiable,
    setIsVisiable,
  
}) => {

  const [previewImage, setPreviewImage] = useState(null)
  const [blockHeight, setBlockHeight] = useState(135);
 

    const messageRef = useRef(null)
    
    useEffect(() => {
      if (attachments.length) {
        setBlockHeight(245);
      } else {
        setBlockHeight(135);
      }
    }, [attachments]); 

    useEffect( () => {
      socket.on()
    },[])
    
    useEffect(() => {
      const onNewMessage = (data) => {
        addMessage(data)
     }

        if (currentDialogId) {
          fetchMessages(currentDialogId);
        }
        socket.on('SERVER:NEW_MESSAGE', onNewMessage);
       
        return () => socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage);
      }, [currentDialogId,fetchMessages,addMessage]);
    
 
    useEffect( () => {
      if(messageRef.current){
          messageRef.current.scrollTo(0,9999);
      }
    },[items])
    
      if(currentDialogId === ''){
          return  <Empty description="Откройте диалог"/>
      }
    return ( 
        <BaseMessages 
        isVisiable={isVisiable}
        setIsVisiable={setIsVisiable}
        items={items} 
        isLoading={isLoading} 
        user={user} 
        blockHeight={blockHeight}
        blockRef={messageRef}
        onRemoveMessage={onRemoveMessage}
        setPreviewImage={setPreviewImage}
        previewImage={previewImage}
        />
    )
}


export default connect(
    ({messages,dialogs,user,attachments})=> ({
    currentDialogId: dialogs.currentDialogId ,
    items: messages.items,
    attachments: attachments.items,
    isLoading: messages.isLoading,
    user: user.data
}),messagesActions)(Dialogs)