import React from 'react';
import '../Dialogs/dialogs.scss'
import { getMessageTime } from 'utils/helpers'
import {  Readed,Avatar } from 'components'
import classnames from 'classnames'
import parseISO from 'date-fns/parseISO'
import { Link } from 'react-router-dom'
import reactStringReplace from 'react-string-replace'
import { Emoji } from 'emoji-mart';

const renderLastMessage = (message,userId ) => {
    if(message.text === null) {
        return message.user._id === userId ? `You: Voice message` : 'Voice message'
    }
    else if (message.text === '' && message.attachments){
        return message.user._id === userId ? `You: attachments` : `attachments`
    }
  
    else {
    return message.user._id === userId ? `You: ` + message.text && reactStringReplace(message.text, /:(.+?):/g, (match,i) => ( <Emoji emoji={match} set="apple" size={24} key={i}/>)) : message.text && reactStringReplace(message.text, /:(.+?):/g, (match,i) => ( <Emoji emoji={match} set="apple" size={24} key={i}/>))
    }
}
const DialogItem = (props) => {
   let { _id,isMe,currentDialogId,lastMessage,userId,partner,friend} = props
 
   currentDialogId = window.location.pathname.split('dialog/')[1]

    return(
        <Link to={`/dialog/${_id}`}>
        <div className={classnames("dialogs__item", {
        'dialogs__item--online': partner.isOnline,
        'dialogs__item--selected': currentDialogId === _id}
    )}
      
        >
        <div className="dialogs__item-avatar" >
            <Avatar user={friend}/>
        </div>
        <div className="dialogs__item-info">
            <div className="dialogs__item-info-top">
                <b>{friend.fullname}</b>
                <span>
                   { lastMessage.createdAt !== null ? getMessageTime(parseISO(lastMessage.createdAt)) : ''}
                </span>
            </div>
            <div className="dialogs__item-info-bottom">
            <p>{renderLastMessage(lastMessage,userId)}</p>
            {isMe && <Readed isMe={true} isReaded={lastMessage.readed}/>}
            {lastMessage.unreaded > 0 && <div className="dialogs__item-info-bottom-count">
                {lastMessage.unreaded > 9 ? '+9' : lastMessage.unreaded}
            </div>}
            </div>
        </div>
    </div>
    </Link>
    )
}


export default DialogItem;