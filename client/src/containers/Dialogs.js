import React, {useState, useEffect,useCallback} from 'react';
import { Dialogs as BaseDialogs } from 'components'
import { dialogsActions } from 'redux/actions'
import { connect } from 'react-redux'
import socket from 'core/socket'

const Dialogs = (props) => {

   const { items,fetchDialogs,setCurrentDialogId,currentDialogId,userId,updateReadedStatus } = props
    const [inputValue ,setValue] = useState("");
    const [filtred, setFiltredItems] = useState(Array.from(items));
 
    const onChangeInput = useCallback((value="") => {
        setFiltredItems(
            items.filter(
                dialog =>
                dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0 
            )
        );
        setValue(value)
    },[items])

   
   
    useEffect(() => {
      setCurrentDialogId(window.location.pathname.split('dialog/')[1])
    },[items,setCurrentDialogId])

    useEffect(() => {
        if (items.length) {
          onChangeInput();
        }
      }, [items,onChangeInput]);

    useEffect(() => {

    const onNewMessage = () => {
        fetchDialogs(userId)
    }

    fetchDialogs(userId)
    socket.on('SERVER:DIALOG_CREATED', onNewMessage);
    socket.on('SERVER:NEW_MESSAGE', onNewMessage);
    socket.on('SERVER:MESSAGES_READED', updateReadedStatus);
    return ( ) => {
        socket.removeListener("SERVER:DIALOG_CREATED", onNewMessage);
        socket.removeListener("SERVER:NEW_MESSAGE", onNewMessage);
    };
    },[fetchDialogs,updateReadedStatus,userId])
    
    filtred.forEach(item => {
        item.author._id === userId ? item.friend = item.partner : item.friend = item.author
    })
    return (
        <BaseDialogs 
        userId={userId}
        items={filtred}
        onSearch={onChangeInput}
        inputValue={inputValue}
        currentDialogId={currentDialogId}
        
        />
    )
}



export default connect(({dialogs}) => {
   return dialogs
},dialogsActions)(Dialogs)