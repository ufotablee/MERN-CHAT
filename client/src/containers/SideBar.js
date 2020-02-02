import React,{useState} from 'react';
import { SideBar as BaseSideBar } from 'components'
import { connect } from 'react-redux'
import { userApi, dialogsApi } from 'utils/api'

const SideBar = ({user}) => {
    const [visible, setVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [messageValue, setmessageValue] = useState('')
    const [users, setUsers] = useState([])
    const [Isloading, setIsLoading] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(false)

    const onClose = () => {
        setVisible(false)
    }
    const onShow = () => {
        setVisible(true)
    }
    const handleChange = (value) => {
        setInputValue(value)
    }
    const handleChangeMessage = (e) => {
        setmessageValue(e.target.value)
    }
    const handleSearch = (value) => {
        setIsLoading(true);
    userApi
      .findUsers(value)
      .then(({ data }) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    }
    const onSelectUser = userId => {
        setSelectedUserId(userId)
    }
    const addDialog = () => {
       dialogsApi
      .create(selectedUserId,messageValue)
      .then(({ data }) => {
        
       onClose()
      })
      .catch((err) => {
      
      });
    }

    return <BaseSideBar 
    user={user} 
    users={users} 
    messageValue={messageValue}
    inputValue={inputValue} 
    handleSearch={handleSearch} 
    handleChangeMessage={handleChangeMessage}
    handleChange={handleChange} 
    onClose={onClose} 
    selectedUserId={selectedUserId}
    onShow={onShow} 
    visible={visible}
    Isloading={Isloading}
    onAddDialog={addDialog}
    onSelectUser={onSelectUser}
    />
}
export default connect( ({user,dialogs})  => ({user: user.data}))(SideBar);    