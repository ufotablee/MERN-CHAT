import React from 'react';
import checkedSvg from '../../assets/image/1231.svg'
import noChecked from '../../assets/image/noChecked.svg'

const Readed = ({isMe,isReaded}) => {

    return (
        isMe && (isReaded ? (
            <img 
            alt={`123`}
            src={checkedSvg} 
            className="message__icon-readed"
            />
        ) : 
        <img 
            src={noChecked} 
            alt={`123`}
            className=" message__icon-readed message__icon-readed--no"
            />
           )
    )
    
    }


export default Readed;