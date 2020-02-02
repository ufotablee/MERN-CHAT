import React from 'react';
import './dialogs.scss'
import { Input, Empty } from 'antd'
// import { Time, Readed } from 'components'
import { DialogItem } from 'components'
import orderBy from 'lodash/orderBy'


const Dialogs = ({items,userId,onSearch, inputValue,currentDialogId}) => {
    return (
    <div className="dialogs">
        <div className="dialogs__search">
        <Input.Search  placeholder="...." style={{width: 200}} onChange={e => onSearch(e.target.value)} value={inputValue}/>
        </div>
    {items.length ? (
        orderBy(items,["created_at"],["desc"]).map((item,i) => (
            <DialogItem
            key={i}
            {...item}
            userId={userId}
            items={items}
            friend={item.friend}
            unreaded={0}
            currentDialogId={currentDialogId}
            isMe={item.author._id === userId}
            /> 
        ))
      )  : (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ничего не найдено"/>)
    }
    </div>  
    )
   
}


export default Dialogs;